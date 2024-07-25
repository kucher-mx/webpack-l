import { PluginItem } from '@babel/core';

export function removeAttributePlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const attrsToRemove = state.opts.props ?? [];

        path.traverse({
          JSXIdentifier(current) {
            const attrName = current.node.name;

            if (attrsToRemove.includes(attrName)) current.parentPath.remove();
          },
        });
      },
    },
  };
}
