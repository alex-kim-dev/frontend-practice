import './style.css';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $switch = $('.theme-switch');
const $form = $('.form');
const $submit = $('.form__submit');
const $feedback = $('.form__feedback');
const $avatar = $('.user__avatar > img');
const $name = $('.user__name');
const $login = $('.user__login > .link');
const $joined = $('.user__joined');
const $bio = $('.user__bio');
const [$repos, $followers, $following] = $$('.meta__value');
const [$location, $website, $twitter, $company] = $$('.details__item');

const themes = {
  light: 'light',
  dark: 'dark',
};

const intialUserData = {
  avatar: './images/avatar-octocat.png',
  name: 'The Octocat',
  login: 'octocat',
  joined: 'Joined 25 Jan 2011',
  bio: null,
  meta: {
    repos: 8,
    followers: 3938,
    following: 9,
  },
  details: {
    location: 'San Francisco',
    website: 'https://github.blog',
    twitter: null,
    company: '@github',
  },
};

const apiEndpoint = 'https://api.github.com/users/';

const formatUserData = (data) => ({
  avatar: data.avatar_url,
  name: data.name ?? data.login,
  login: data.login, // without @
  joined: 'Joined '.concat(
    new Date(data.created_at).toLocaleDateString('en-UK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
  ),
  bio: data.bio, // nullable
  meta: {
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  },
  details: {
    location: data.location, // nullable
    website: data.blog, // nullable
    twitter: data.twitter_username, // without @, nullable
    company: data.company, // with @, nullable
  },
});

const renderTheme = (theme) => {
  switch (theme) {
    case themes.light: {
      document.body.removeAttribute('data-theme');
      $switch.setAttribute('aria-checked', false);
      return;
    }
    case themes.dark: {
      document.body.setAttribute('data-theme', themes.dark);
      $switch.setAttribute('aria-checked', true);
    }
    // no default
  }
};

const renderSearchState = ({ isLoading, user, error }) => {
  $submit.classList[isLoading ? 'add' : 'remove']('btn--loading');
  $submit[isLoading ? 'setAttribute' : 'removeAttribute']('disabled', '');

  const errorMsg =
    error?.cause?.status === 404 ? 'No results' : 'Error fetching data';
  $feedback.textContent = error ? errorMsg : '';

  $avatar.src = user.avatar;

  $name.textContent = user.name;

  $login.href = `https://github.com/${user.login}`;
  $login.textContent = '@'.concat(user.login);

  $joined.textContent = user.joined;

  $bio.textContent = user.bio ?? 'This profile has no bio';
  $bio.classList[user.bio ? 'remove' : 'add']('muted');

  $repos.textContent = user.meta.repos;
  $followers.textContent = user.meta.followers;
  $following.textContent = user.meta.following;

  const { location, website, twitter, company } = user.details;

  $location.textContent = location ?? 'Not Available';
  $location.classList[location ? 'remove' : 'add']('muted');

  if (website) {
    $website.firstElementChild.setAttribute('href', website);
    $website.firstElementChild.textContent = website;
  }
  $website.classList[website ? 'remove' : 'add']('muted');

  if (twitter) {
    $twitter.firstElementChild.setAttribute(
      'href',
      `https://twitter.com/${twitter}`,
    );
    $twitter.firstElementChild.textContent = '@'.concat(twitter);
  }
  $twitter.classList[twitter ? 'remove' : 'add']('muted');

  if (company) {
    $company.firstElementChild.setAttribute(
      'href',
      `https://github.com/${company.slice(1)}`,
    );
    $company.firstElementChild.textContent = company;
  }
  $company.classList[company ? 'remove' : 'add']('muted');
};

const state = new Proxy(
  Object.seal({
    theme: themes.light,
    search: { isLoading: false, user: intialUserData, error: null },
  }),
  {
    set: (container, prop, value) => {
      switch (prop) {
        case 'theme': {
          if (container[prop] !== value) {
            container[prop] = value;
            renderTheme(value);
          }
          break;
        }

        case 'search': {
          container[prop] = value;
          renderSearchState(value);
          break;
        }

        // no default
      }

      return true;
    },
  },
);

$switch.addEventListener('click', ({ currentTarget }) => {
  state.theme =
    currentTarget.getAttribute('aria-checked') === 'true'
      ? themes.light
      : themes.dark;
});

$form.addEventListener('submit', (event) => {
  event.preventDefault();

  state.search = { ...state.search, isLoading: true };
  const username = new FormData(event.currentTarget).get('username');

  fetch(`${apiEndpoint}${username}`)
    .then((response) => {
      const { ok, status, statusText } = response;
      if (!ok) {
        const error = new Error(`${status}: ${statusText}`);
        error.cause = response;
        throw error;
      }

      return response.json();
    })
    .then((data) => {
      state.search = {
        ...state.search,
        isLoading: false,
        user: formatUserData(data),
      };
    })
    .catch((error) => {
      state.search = {
        ...state.search,
        isLoading: false,
        error,
      };
    });
});
