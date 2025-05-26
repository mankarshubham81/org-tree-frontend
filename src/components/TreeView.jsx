import React from 'react';
import './TreeView.css';

const layerColors = [
  '#90CAF9', // layer 0 – light blue
  '#A5D6A7', // layer 1 – light green
  '#FFE082', // layer 2 – light amber
  '#CE93D8', // layer 3 – light purple
];

const TreeNode = ({ node, depth = 0 }) => {
  const color = layerColors[depth % layerColors.length];

  return (
    <div
      className="tree-node"
      style={{ '--connector-color': color }}
    >
      <div
        className="employee-card"
        style={{ borderLeftColor: color }}
      >
        <img
          src={`${node.image}`}
          alt={node.name}
          className="employee-image"
        />
        <div className="employee-info">
          <div className="employee-name">{node.name}</div>
          <div className="employee-role">{node.designation}</div>
        </div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode key={child._id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data }) => (
  <div className="tree-container">
    {data.map((root) => (
      <TreeNode key={root._id} node={root} />
    ))}
  </div>
);

export default TreeView;
