import './style.css';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $switch = $('.theme-switch');
const $form = $('.form');
const $submit = $('.form__submit');
const $user = $('.user');
const $feedback = $('.form__feedback');
const $avatar = $('.avatar');
const $name = $('.user__name');
const $login = $('.login');
const $joined = $('.user__joined');
const $bio = $('.user__bio');
const [$repos, $followers, $following] = $$('.meta__value');
const [$location, $website, $twitter, $company] = $$('.details__item');

const apiEndpoint = 'https://api.github.com/users/';

const themes = {
  light: 'light',
  dark: 'dark',
};

const intialUserData = {
  avatar: './images/avatar-octocat.png',
  name: 'The Octocat',
  login: 'octocat',
  joined: 'Joined 25 Jan 2011',
  bio: '',
  meta: {
    repos: 8,
    followers: 3938,
    following: 9,
  },
  details: {
    location: 'San Francisco',
    website: 'https://github.blog',
    twitter: '',
    company: '@github',
  },
};

const toggleAttr = (element, condition) => (attr, value) =>
  element[condition ? 'setAttribute' : 'removeAttribute'](attr, value);

const toggleClass = (element, condition) => (cls) =>
  element.classList[condition ? 'add' : 'remove'](cls);

const toggleMuted = (element, condition) =>
  toggleClass(element, condition)('muted');

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
  bio: data.bio ?? '',
  meta: {
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  },
  details: {
    location: data.location ?? '',
    website: data.blog ?? '',
    twitter: data.twitter_username ?? '', // without @
    company: data.company ?? '', // with @
  },
});

const render = {
  theme: (theme) => {
    const isDark = theme === themes.dark;
    toggleAttr(document.body, isDark)('data-theme', themes.dark);
    $switch.setAttribute('aria-checked', isDark);
  },

  isLoading: (isLoading) => {
    toggleClass($submit, isLoading)('btn--loading');
    toggleAttr($submit, isLoading)('disabled', '');

    $user.setAttribute('aria-busy', isLoading);
    toggleMuted($user, isLoading);
  },

  error: (error) => {
    $feedback.textContent = (() => {
      if (error?.cause?.status === 404) return 'No results';
      if (error?.cause instanceof Response) return 'Error fetching data';
      return error?.message ?? '';
    })();
  },

  user: ({ avatar, name, login, joined, bio, meta, details }) => {
    const { location, website, twitter, company } = details;

    $avatar.setAttribute('src', '');
    $avatar.setAttribute('src', avatar);

    $name.textContent = name;

    $login.setAttribute('href', `https://github.com/${login}`);
    $login.textContent = '@'.concat(login);

    $joined.textContent = joined;

    $bio.textContent = bio || 'This profile has no bio';
    toggleMuted($bio, !bio);

    $repos.textContent = meta.repos;
    $followers.textContent = meta.followers;
    $following.textContent = meta.following;

    $location.textContent = location || 'Not Available';
    toggleMuted($location, !location);

    $website.firstElementChild.setAttribute('href', website);
    $website.firstElementChild.textContent = website;
    toggleMuted($website, !website);

    $twitter.firstElementChild.setAttribute(
      'href',
      `https://twitter.com/${twitter}`,
    );
    $twitter.firstElementChild.textContent = '@'.concat(twitter);
    toggleMuted($twitter, !twitter);

    $company.firstElementChild.setAttribute(
      'href',
      `https://github.com/${company?.slice(1)}`,
    );
    $company.firstElementChild.textContent = company;
    toggleMuted($company, !company);
  },
};

const state = new Proxy(
  Object.seal({
    theme: themes.dark,
    isLoading: false,
    user: intialUserData,
    error: null,
  }),
  {
    set: (container, prop, value) => {
      if (container[prop] !== value) {
        container[prop] = value;
        render[prop](value);
      }
      return true;
    },
  },
);

const fetchUser = async (username) => {
  if (!username) {
    state.error = new Error('The field is empty');
    return;
  }

  state.isLoading = true;
  state.error = null;

  try {
    const response = await fetch(`${apiEndpoint}${username}`);
    const { ok, status, statusText } = response;

    if (!ok) {
      const error = new Error(`${status}: ${statusText}`);
      error.cause = response;
      throw error;
    }

    state.user = formatUserData(await response.json());
  } catch (error) {
    state.error = error;
  } finally {
    state.isLoading = false;
  }
};

const handleThemeChange = ({ currentTarget }) => {
  state.theme =
    currentTarget.getAttribute('aria-checked') === 'true'
      ? themes.light
      : themes.dark;
};

const handleSearchSubmit = (event) => {
  event.preventDefault();

  if (state.isLoading) return;

  const username = new FormData(event.currentTarget).get('username').trim();

  fetchUser(username);
};

$switch.addEventListener('click', handleThemeChange);
$form.addEventListener('submit', handleSearchSubmit);

const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches;
state.theme = prefersDark ? themes.dark : themes.light;

fetchUser('octocat');
