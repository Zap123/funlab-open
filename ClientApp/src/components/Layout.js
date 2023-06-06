import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

const  Layout = ({children}) => {
        return <>
          {children}
          <NavMenu />
      </>
}

export default Layout;