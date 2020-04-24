
export function addCycleLoop (func, { timeout, stopOnFail = false }) {
  const obj = {};
  let timeSpend;
  const wFunc = function (isPromise = false) {
    const startTime = +new Date();
    const res = func();
    if (isPromise) {
      const handle = function (data) {
        timeSpend = (+new Date() - startTime);
        return data;
      };
      return res.then(handle).catch(handle);
    } else {
      timeSpend = +(new Date()) - startTime;
      return res;
    }
  };
  const cycle = function (isPromise = false) {
    return function () {
      const res = wFunc(isPromise);
      if (obj.timer == -1) {
        return;
      }
      if (timeSpend >= timeout) {
        if (isPromise) {
          pCycle();
        } else {
          nCycle();
        }
      } else {
        obj.timer = setTimeout(() => {
          if (isPromise) {
            pCycle();
          } else {
            nCycle();
          }
        }, timeout - (timeSpend / 1000));
      }
    };
  };
  const pCycle = cycle(true);
  const nCycle = cycle();
  if (typeof func.then === 'function') {
    pCycle();
  } else {
    nCycle();
  }
  return obj;
}

export function removeCycleLoop (obj = {}) {
  clearTimeout(obj.timer);
  obj.timer = -1;
}
