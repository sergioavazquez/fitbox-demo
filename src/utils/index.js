async function loadFile(path) {
  let error = false;
  let response;

  try {
    response = await fetch(path);
  } catch (e) {
    console.log(e);
    error = true;
  }
  const data = await response.json().catch(() => {
    console.log(path, ' content is not valid JSON.');
    error = true;
  });
  const result = error === false ? data : null;
  return result;
}

function debounce(fn, interval, { leading } = {}) {
  let timeout;
  let leadExecuted = false;
  const timer = typeof interval === 'number' ? interval : 200;
  const lead = typeof leading === 'boolean' ? leading : false;
  return (...args) => {
    const context = this;
    const postponed = () => {
      timeout = null;
      if (lead) {
        leadExecuted = false;
      } else {
        fn.apply(context, args);
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(postponed, timer);
    if (lead && !leadExecuted) {
      leadExecuted = true;
      fn.apply(context, args);
    }
  };
}

function timeChecker() {
  let lastProgress = 0;
  let valid = true;
  return {
    log: (progress) => {
      if (Math.floor(progress) === 0 && valid === false) {
        valid = true;
        lastProgress = progress;
      }
      if (progress - lastProgress < 2) {
        lastProgress = progress;
      } else {
        valid = false;
      }
    },
    watched: () => {
      let result = false;
      if (valid) {
        result = lastProgress;
      }
      return result;
    }
  }
}

export { loadFile, debounce, timeChecker };