declare module "*.svg" {
  import React from "react";

  // Default export cho URL
  const src: string;
  export default src;

  // Named export cho React component
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
