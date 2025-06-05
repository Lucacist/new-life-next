"use client";

import React from 'react';

function ProfileHeader({ user }) {
  // Obtenir le prénom et le nom de l'utilisateur pour l'affichage
  const getFullName = () => {
    if (!user) return "Utilisateur";
    
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    
    return user.email?.split("@")[0] || "Utilisateur";
  };

  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="none"
          viewBox="0 0 512 512"
        >
          <g clipPath="url(#a)">
            <path
              fill="currentColor"
              d="M256 256a127.998 127.998 0 0 0 118.257-79.017 128.003 128.003 0 0 0-167.24-167.24A128.001 128.001 0 0 0 128 128a128.125 128.125 0 0 0 128 128Zm0-213.333a85.336 85.336 0 0 1 83.694 101.981 85.337 85.337 0 0 1-67.046 67.046A85.335 85.335 0 1 1 256 42.667Zm0 256a192.211 192.211 0 0 0-192 192 21.334 21.334 0 0 0 42.667 0 149.334 149.334 0 1 1 298.666 0 21.333 21.333 0 0 0 42.667 0 192.211 192.211 0 0 0-192-192Z"
            />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h512v512H0z" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="profile-info">
        <h1>{getFullName()}</h1>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
