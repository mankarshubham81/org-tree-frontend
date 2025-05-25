import React from 'react';
import './TreeView.css';

const TreeNode = ({ node }) => (
  <div className="tree-node">
    <div className="employee-card">
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
          <TreeNode key={child._id} node={child} />
        ))}
      </div>
    )}
  </div>
);

const TreeView = ({ data }) => (
  <div className="tree-container">
    {data.map((root) => (
      <TreeNode key={root._id} node={root} />
    ))}
  </div>
);

export default TreeView;
