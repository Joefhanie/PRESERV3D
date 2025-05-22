const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'artifacts', component: () => import('pages/ArtifactsPage.vue') },
      { path: 'documents', component: () => import('pages/DocumentsPage.vue') },
      { path: 'gallery', component: () => import('pages/GalleryPage.vue') },
      { path: 'upload', component: () => import('pages/UploadPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
