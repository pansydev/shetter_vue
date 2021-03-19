declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.gql" {
  import { DocumentNode } from "@apollo/client";
  const content: DocumentNode;
  export default content;
}
