import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const SamplePage = Loadable(lazy(() => import('views/SamplePage')));
const UsersList = Loadable(lazy(() => import('views/Users/UsersList')));
const AddEditUser = Loadable(lazy(() => import('views/Users/AddEditUser')));
const Documents = Loadable(lazy(() => import('views/Documents/Documents')));
const UploadDocument = Loadable(lazy(() => import('views/Documents/UploadDocument')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element: <SamplePage /> },
    { path: '/users-list', element: <UsersList /> },
    { path: '/add-edit-user', element: <AddEditUser /> },
    { path: '/documents', element: <Documents /> },
    { path: '/upload-document', element: <UploadDocument /> }
  ]
};

export default MainRoutes;
