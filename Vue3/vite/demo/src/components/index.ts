import Button from "./button";
import Table from "./table";

const components = [Button, Table];

const YcUI = {
  // install 方法 接收参数app
  install(app) {
    components.forEach((comp) => {
      app.component(comp.name, comp);
    });
  },
};
export default YcUI;
