import FormRecipe from 'src/components/FormRecipe.vue'
import AddCategory from 'pages/category/AddCategory.vue'
import AddRecip from 'pages/AddRecip.vue'
import EditRecip from 'pages/EditRecip.vue'
import RecipDetail from 'pages/RecipDetail.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '/', 
      //   component: () => import('src/pages/Recips.vue'),
      //   props: true 
      // },
      { path: '/', 
        component: () => import('src/pages/category/Categorys.vue'),
        props: true 
      },

      { path: ':category_slug', 
        component: () => import('src/pages/category/Categorys.vue'),
        props: true 
      },

      { path: ':category_slug', 
        component: () => import('src/pages/RecipsFilterd.vue'),
        props: true 
      },

      {
        path: '/add-category',
        name: 'AddCategory',
        component: AddCategory
      },
      
      {
        path: '/form',
        name: 'FormRecipe',
        component: FormRecipe
      },

      {
        path: '/add-recip',
        name: 'AddRecip',
        component: AddRecip
      },

      {
        path: '/recip-detail/:recip_slug',
        name: 'RecipDetail',
        props: true,
        component: RecipDetail
      },

      {
        path: '/edit-recip',
        name: 'EditRecip',
        props: true,
        component: EditRecip
      },
    ]
  },

  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
