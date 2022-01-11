import React from 'react';

/* const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User')); */

const Main = React.lazy(() => import('./views/pages/main/Main'));


// Parametrizacion - Evento de riesgo
const AdministracionEventoListar = React.lazy(() => import('./views/administracion/evento-riesgo/Listar'));
const AdministracionEventoRegistrar = React.lazy(() => import('./views/administracion/evento-riesgo/Registrar'));
const AdministracionEventoEditar = React.lazy(() => import('./views/administracion/evento-riesgo/Editar'));

// Parametrizacion Matriz de riesgo
const AdministracionMatrizRiesgosListar = React.lazy(() => import('./views/administracion/matriz-riesgo/Listar'));
const AdministracionMatrizRiesgosRegistrar = React.lazy(() => import('./views/administracion/matriz-riesgo/Registrar'));
const AdministracionMatrizRiesgosEditar = React.lazy(() => import('./views/administracion/matriz-riesgo/Editar'));

// Parametrizacion Matriz de oportunidad
const AdministracionMatrizOportunidadListar = React.lazy(() => import('./views/administracion/matriz-oportunidad/Listar'));
const AdministracionMatrizOportunidadRegistrar = React.lazy(() => import('./views/administracion/matriz-oportunidad/Registrar'));
const AdministracionMatrizOportunidadEditar = React.lazy(() => import('./views/administracion/matriz-oportunidad/Editar'));

// Parametrizacion Seguridad
const AdministracionSeguridadListar = React.lazy(() => import('./views/administracion/seguridad/Listar'));
const AdministracionSeguridadRegistrar = React.lazy(() => import('./views/administracion/seguridad/Registrar'));
const AdministracionSeguridadEditar = React.lazy(() => import('./views/administracion/seguridad/Editar'));

// 1er Modulo: Eventos de riesgo
const EventoRiesgoListar = React.lazy(() => import('./views/eventoRiesgo/Listar'));
const EventoRiesgoRegistrar = React.lazy(() => import('./views/eventoRiesgo/Registrar'));
const EventoRiesgo = React.lazy(() => import('./views/eventoRiesgo/Mostrar'));

// 2do Modulo: Matriz de riesgos
const MatrizRiesgoListar = React.lazy(() => import('./views/matrizRiesgo/Listar'));
const MatrizRiesgoRegistrar = React.lazy(() => import('./views/matrizRiesgo/Registrar'));
const MatrizRiesgoMostrar = React.lazy(() => import('./views/matrizRiesgo/Mostrar'));

// 3er Modulo: Matriz de oporunidades
const MatrizOportunidadListar = React.lazy(() => import('./views/matrizOportunidad/Listar'));
const MatrizOportunidadRegistrar = React.lazy(() => import('./views/matrizOportunidad/Registrar'));
const MatrizOportunidadMostrar = React.lazy(() => import('./views/matrizOportunidad/Mostrar'));

// Modulo de Seguridad
const SeguridadListar = React.lazy(() => import('./views/seguridad/Listar'));
const SeguridadRegistrar = React.lazy(() => import('./views/seguridad/Registrar'));
const SeguridadMostrar = React.lazy(() => import('./views/seguridad/Mostrar'));
const SeguridadControl = React.lazy(() => import('./views/seguridad/Control'));
const SeguridadEditar = React.lazy(() => import('./views/seguridad/Editar'));

const routes = [
 /* { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }, */
  { path: '/', exact: true, name: 'Home' },
  { path: '/main', name: 'Main', component: Main },
  { path: '/eventoRiesgo/Mostrar/:id', name: 'Evento de Riesgo', component: EventoRiesgo }, // start
  { path: '/matrizRiesgo/Mostrar/:id', name: 'Matriz de Riesgo', component: MatrizRiesgoMostrar }, // start
  { path: '/matrizOportunidad/Mostrar/:id', name: 'Matriz de oportunidad', component: MatrizOportunidadMostrar }, // start
  { path: '/seguridad/Mostrar/:id', name: 'Riesgo en Seguridad', component: SeguridadMostrar },

  // Parametrizacion
  { path: '/administracion', name: 'Administración', component: AdministracionEventoListar, exact: true },
  { path: '/administracion/evento-riesgo/Listar', name: 'Parámetros de Eventos de riesgo', component: AdministracionEventoListar },
  { path: '/administracion/evento-riesgo/Registrar', name: 'Registrar parámetro de Evento de Riesgo', component: AdministracionEventoRegistrar },
  { path: '/administracion/evento-riesgo/Editar/:id', name: 'Editar parámetro de Evento de Riesgo', component: AdministracionEventoEditar },

  { path: '/administracion/matriz-riesgo/Listar', name: 'Parámetros de Matriz de riesgo', component: AdministracionMatrizRiesgosListar },
  { path: '/administracion/matriz-riesgo/Registrar', name: 'Registrar parámetro de Matriz de riesgo', component: AdministracionMatrizRiesgosRegistrar },
  { path: '/administracion/matriz-riesgo/Editar/:id', name: 'Editar parámetro de Matriz de riesgo', component: AdministracionMatrizRiesgosEditar },

  { path: '/administracion/matriz-oportunidad/Listar', name: 'Parámetros de Matriz de oportunidades', component: AdministracionMatrizOportunidadListar },
  { path: '/administracion/matriz-oportunidad/Registrar', name: 'Registrar parámetro de Matriz de oportunidad', component: AdministracionMatrizOportunidadRegistrar },
  { path: '/administracion/matriz-oportunidad/Editar/:id', name: 'Editar parámetro de Matriz de oportunidad', component: AdministracionMatrizOportunidadEditar },

  { path: '/administracion/seguridad/Listar', name: 'Parámetros de Seguridad', component: AdministracionSeguridadListar },
  { path: '/administracion/seguridad/Registrar', name: 'Registrar parámetro de Seguridad', component: AdministracionSeguridadRegistrar },
  { path: '/administracion/seguridad/Editar/:id', name: 'Editar parámetro de Seguridad', component: AdministracionSeguridadEditar },

  // 1er Modulo: Eventos de riesgo
  { path: '/eventoRiesgo', name: 'Eventos de Riesgo', component: EventoRiesgoListar, exact: true },
  { path: '/eventoRiesgo/Listar', name: 'Lista de Eventos de riesgo', component: EventoRiesgoListar },
  { path: '/eventoRiesgo/Registrar', name: 'Registrar Evento de Riesgo', component: EventoRiesgoRegistrar },

  // 2do Modulo: Matriz de riesgo
  { path: '/matrizRiesgo', name: 'Matriz de Riesgo', component: MatrizRiesgoListar, exact: true },
  { path: '/matrizRiesgo/Listar', name: 'Lista de Matriz de riesgos', component: MatrizRiesgoListar },
  { path: '/matrizRiesgo/Registrar', name: 'Registrar Matriz de Riesgo', component: MatrizRiesgoRegistrar },

  // 3er Modulo: Matriz de oportunidad
  { path: '/matrizOportunidad', name: 'Matriz de oportunidad', component: MatrizOportunidadListar, exact: true },
  { path: '/matrizOportunidad/Listar', name: 'Lista de Matriz de oportunidades', component: MatrizOportunidadListar },
  { path: '/matrizOportunidad/Registrar', name: 'Registrar Matriz de oportunidad', component: MatrizOportunidadRegistrar },

  // Modulo de Seguridad
  { path: '/seguridad', name: 'Riesgo en Seguridad', component: SeguridadListar, exact: true },
  { path: '/seguridad/Listar', name: 'Lista de Riesgos en Seguridad', component: SeguridadListar },
  { path: '/seguridad/Registrar', name: 'Registrar Riesgo en Seguridad', component: SeguridadRegistrar },
  { path: '/seguridad/Control', name: 'Control de Riesgo en Seguridad', component: SeguridadControl },
  { path: '/seguridad/Editar/:id', name: 'Editar Riesgo en Seguridad', component: SeguridadEditar },
];

export default routes;
