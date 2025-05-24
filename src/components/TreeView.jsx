// src/components/TreeView.jsx
import React from 'react';
import './TreeView.css';

const TreeNode = ({ node }) => (
  <div className="tree-node">
    <div className="employee-card">
      <img src={`http://localhost:4000${node.image}`} alt={node.name} className="employee-image" />
      <div className="employee-details">
        <p className="employee-name">{node.name}</p>
        <p className="employee-designation">{node.designation}</p>
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

const TreeView = ({ data }) => {
  return (
    <div className="tree-container">
      {data.map((node) => (
        <TreeNode key={node._id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
