export const getConfigFile = () => {
  let file = '/config.json'
  if (process.env.NODE_ENV === 'development') {
    file = '/config.dev.json';
  }
  return process.env.PUBLIC_URL + file;
}

export const NOT_FOUND_404 = "/404/";