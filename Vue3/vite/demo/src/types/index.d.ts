// setup props
export type IPropsData = {
  [key: string]: unknown;
};

// setup context
export type ISetupContext = {
  attrs: Data;
  slots: Slots;
  emit: (event: string, ...args: unknown[]) => void;
  expose: (exposed?: Record<string, any>) => void;
};

export type IMenuClick = {
  item: {
    danger: boolean;
    disabled: boolean;
    icon: undefined | string; // todo 不知道是什么
    id: undefined | string; // todo 不知道是什么
    role: undefined | string; // todo 不知道是什么
    title: undefined | string; // todo 不知道是什么
  };
  key: string;
  keyPath: string;
};
