import React from 'react';

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
const UpdateEventoRiesgo = React.lazy(() => import('./views/eventoRiesgo/Editar'));

// 2do Modulo: Matriz de riesgos
const MatrizRiesgoListar = React.lazy(() => import('./views/matrizRiesgo/Listar'));
const MatrizRiesgoRegistrar = React.lazy(() => import('./views/matrizRiesgo/Registrar'));
const MatrizRiesgoMostrar = React.lazy(() => import('./views/matrizRiesgo/Mostrar'));
const MatrizRiesgoEditar = React.lazy(() => import('./views/matrizRiesgo/Editar'));

// 3er Modulo: Matriz de oporunidades
const MatrizOportunidadListar = React.lazy(() => import('./views/matrizOportunidad/Listar'));
const MatrizOportunidadRegistrar = React.lazy(() => import('./views/matrizOportunidad/Registrar'));
const MatrizOportunidadMostrar = React.lazy(() => import('./views/matrizOportunidad/Mostrar'));
const MatrizOportunidadEditar = React.lazy(() => import('./views/matrizOportunidad/Editar'));

// Modulo de Seguridad
const SeguridadListar = React.lazy(() => import('./views/seguridad/Listar'));
const SeguridadRegistrar = React.lazy(() => import('./views/seguridad/Registrar'));
const SeguridadMostrar = React.lazy(() => import('./views/seguridad/Mostrar'));
const SeguridadControl = React.lazy(() => import('./views/seguridad/Control'));
const SeguridadEditar = React.lazy(() => import('./views/seguridad/Editar'));

// Modulo de Reportes
const ReporteEvento = React.lazy(() => import('./views/reporte/ReporteEvento'));

const routes = [
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
  { path: '/eventoRiesgo/Editar/:id', name: 'Editar Evento de Riesgo', component: UpdateEventoRiesgo },

  // 2do Modulo: Matriz de riesgo
  { path: '/matrizRiesgo', name: 'Matriz de Riesgo', component: MatrizRiesgoListar, exact: true },
  { path: '/matrizRiesgo/Listar', name: 'Lista de Matriz de riesgos', component: MatrizRiesgoListar },
  { path: '/matrizRiesgo/Registrar', name: 'Registrar Matriz de Riesgo', component: MatrizRiesgoRegistrar },
  { path: '/matrizRiesgo/editar/:id', name: 'Editar Matriz de Riesgo', component: MatrizRiesgoEditar },

  // 3er Modulo: Matriz de oportunidad
  { path: '/matrizOportunidad', name: 'Matriz de oportunidad', component: MatrizOportunidadListar, exact: true },
  { path: '/matrizOportunidad/Listar', name: 'Lista de Matriz de oportunidades', component: MatrizOportunidadListar },
  { path: '/matrizOportunidad/Registrar', name: 'Registrar Matriz de oportunidad', component: MatrizOportunidadRegistrar },
  { path: '/matrizOportunidad/editar/:id', name: 'Editar Matriz de oportunidad', component: MatrizOportunidadEditar },

  // Modulo de Seguridad
  { path: '/seguridad', name: 'Riesgo en Seguridad', component: SeguridadListar, exact: true },
  { path: '/seguridad/Listar', name: 'Lista de Riesgos en Seguridad', component: SeguridadListar },
  { path: '/seguridad/Registrar', name: 'Registrar Riesgo en Seguridad', component: SeguridadRegistrar },
  { path: '/seguridad/Control', name: 'Control de Riesgo en Seguridad', component: SeguridadControl },
  { path: '/seguridad/Editar/:id', name: 'Editar Riesgo en Seguridad', component: SeguridadEditar },

  // Modulo de Reportes
  { path: '/reporte', name: 'Reportes', component: SeguridadListar, exact: true },
  { path: '/reporte/evento-riesgo', name: 'Reportes de Eventos', component: ReporteEvento },
];

export default routes;
