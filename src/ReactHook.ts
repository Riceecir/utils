import _useUrlState from "../node_modules/@ahooksjs/use-url-state";

/**
 * 基于 @ahooksjs/use-url-state 封装
 * 改良的地方：
 * 1. 调用 setUrlState 给 search 赋值会正确的清除掉旧值；
 * (按官方文档想清除某个值得传undefined或者null，不传则会缓存上一次的值)
 * 例子：
 * 原合并逻辑为：旧: { name: 'name', age: 10 }, 传入：{ age: 99 }; 合并后：{ name: 'name', age: 99 }
 * 新合并逻辑为：旧: { name: 'name', age: 10 }, 传入：{ age: 99 }; 合并后：{ age: 99 } ( name 会被清除掉 )
 */

const useUrlState: typeof _useUrlState = (...props) => {
  const [_state, _setState] = _useUrlState(...props);

  const setState: typeof _setState = (obj) => {
    const state = { ..._state, ...obj };

    // 值不在了，则设置为 undefained
    for (const i in state) {
      if (i in obj) continue;
      state[i] = undefined as any;
    }

    _setState(state);
  };

  return [_state, setState];
};

export default useUrlState;
