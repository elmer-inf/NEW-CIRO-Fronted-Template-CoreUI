import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog, faCogs,
  faCreditCard, faUniversity, faLandmark,
  faUser, faUserEdit, faUserPlus, faUsersCog, faUsers,
  faUserShield, faUserCheck, faUserTie, faUserCog,
  faMoneyCheck, faPiggyBank, faHandHoldingUsd,
  faSuperscript, faKeyboard, faTable, faDiceD6, faTasks,
  faListAlt, faClipboardList, faClipboardCheck,
  faInfo, faInfoCircle, faDatabase, faServer,
  faCloud, faCloudDownloadAlt, faCloudUploadAlt, faSignal,
  faLink, faSatellite, faGlobe,
  faCode, faCodeBranch, faWindowMaximize,
  faFile, faFileAlt, faFileArchive, faFilter,
  faCube, faCubes
} from '@fortawesome/free-solid-svg-icons';

export const pagingInit = {
  page: 0,//valor que se enviara -> por defecto
  size: 10, //valor que se enviara -> por defecto
  pages: 0,//valor que se recibira -> dinamico
  total: 0,//valor que se recibira -> dinamico
};

export const backdrop = 'static';
export const keyboard = true;

export const iconList = [
  {
    value: 'faCog',
    label: <FontAwesomeIcon icon={faCog} />,
    component: faCog
  },
  {
    value: 'faCogs',
    label: <FontAwesomeIcon icon={faCogs} />,
    component: faCogs
  },
  {
    value: 'faCreditCard',
    label: <FontAwesomeIcon icon={faCreditCard} />,
    component: faCreditCard
  },
  {
    value: 'faUniversity',
    label: <FontAwesomeIcon icon={faUniversity} />,
    component: faUniversity
  },
  {
    value: 'faLandmark',
    label: <FontAwesomeIcon icon={faLandmark} />,
    component: faLandmark
  },
  {
    value: 'faUser',
    label: <FontAwesomeIcon icon={faUser} />,
    component: faUser
  },
  {
    value: 'faUserEdit',
    label: <FontAwesomeIcon icon={faUserEdit} />,
    component: faUserEdit
  },
  {
    value: 'faUserPlus',
    label: <FontAwesomeIcon icon={faUserPlus} />,
    component: faUserPlus
  },
  {
    value: 'faUsersCog',
    label: <FontAwesomeIcon icon={faUsersCog} />,
    component: faUsersCog
  },
  {
    value: 'faUsers',
    label: <FontAwesomeIcon icon={faUsers} />,
    component: faUsers
  },
  {
    value: 'faUserShield',
    label: <FontAwesomeIcon icon={faUserShield} />,
    component: faUserShield
  },
  {
    value: 'faUserCheck',
    label: <FontAwesomeIcon icon={faUserCheck} />,
    component: faUserCheck
  },
  {
    value: 'faUserTie',
    label: <FontAwesomeIcon icon={faUserTie} />,
    component: faUserTie
  },
  {
    value: 'faUserCog',
    label: <FontAwesomeIcon icon={faUserCog} />,
    component: faUserCog
  },
  {
    value: 'faMoneyCheck',
    label: <FontAwesomeIcon icon={faMoneyCheck} />,
    component: faMoneyCheck
  },
  {
    value: 'faPiggyBank',
    label: <FontAwesomeIcon icon={faPiggyBank} />,
    component: faPiggyBank
  },
  {
    value: 'faHandHoldingUsd',
    label: <FontAwesomeIcon icon={faHandHoldingUsd} />,
    component: faHandHoldingUsd
  },
  {
    value: 'faSuperscript',
    label: <FontAwesomeIcon icon={faSuperscript} />,
    component: faSuperscript
  },
  {
    value: 'faKeyboard',
    label: <FontAwesomeIcon icon={faKeyboard} />,
    component: faKeyboard
  },
  {
    value: 'faTable',
    label: <FontAwesomeIcon icon={faTable} />,
    component: faTable
  },
  {
    value: 'faDiceD6',
    label: <FontAwesomeIcon icon={faDiceD6} />,
    component: faDiceD6
  },
  {
    value: 'faTasks',
    label: <FontAwesomeIcon icon={faTasks} />,
    component: faTasks
  },
  {
    value: 'faListAlt',
    label: <FontAwesomeIcon icon={faListAlt} />,
    component: faListAlt
  },
  {
    value: 'faClipboardList',
    label: <FontAwesomeIcon icon={faClipboardList} />,
    component: faClipboardList
  },
  {
    value: 'faClipboardCheck',
    label: <FontAwesomeIcon icon={faClipboardCheck} />,
    component: faClipboardCheck
  },
  {
    value: 'faInfo',
    label: <FontAwesomeIcon icon={faInfo} />,
    component: faInfo
  },
  {
    value: 'faInfoCircle',
    label: <FontAwesomeIcon icon={faInfoCircle} />,
    component: faInfoCircle
  },
  {
    value: 'faDatabase',
    label: <FontAwesomeIcon icon={faDatabase} />,
    component: faDatabase
  },
  {
    value: 'faServer',
    label: <FontAwesomeIcon icon={faServer} />,
    component: faServer
  },
  {
    value: 'faCloud',
    label: <FontAwesomeIcon icon={faCloud} />,
    component: faCloud
  },
  {
    value: 'faCloudDownloadAlt',
    label: <FontAwesomeIcon icon={faCloudDownloadAlt} />,
    component: faCloudDownloadAlt
  },
  {
    value: 'faCloudUploadAlt',
    label: <FontAwesomeIcon icon={faCloudUploadAlt} />,
    component: faCloudUploadAlt
  },
  {
    value: 'faSignal',
    label: <FontAwesomeIcon icon={faSignal} />,
    component: faSignal
  },
  {
    value: 'faLink',
    label: <FontAwesomeIcon icon={faLink} />,
    component: faLink
  },
  {
    value: 'faSatellite',
    label: <FontAwesomeIcon icon={faSatellite} />,
    component: faSatellite
  },
  {
    value: 'faGlobe',
    label: <FontAwesomeIcon icon={faGlobe} />,
    component: faGlobe
  },
  {
    value: 'faCode',
    label: <FontAwesomeIcon icon={faCode} />,
    component: faCode
  },
  {
    value: 'faCodeBranch',
    label: <FontAwesomeIcon icon={faCodeBranch} />,
    component: faCodeBranch
  },
  {
    value: 'faWindowMaximize',
    label: <FontAwesomeIcon icon={faWindowMaximize} />,
    component: faWindowMaximize
  },
  {
    value: 'faFile',
    label: <FontAwesomeIcon icon={faFile} />,
    component: faFile
  },
  {
    value: 'faFileAlt',
    label: <FontAwesomeIcon icon={faFileAlt} />,
    component: faFileAlt
  },
  {
    value: 'faFileArchive',
    label: <FontAwesomeIcon icon={faFileArchive} />,
    component: faFileArchive
  },
  {
    value: 'faFilter',
    label: <FontAwesomeIcon icon={faFilter} />,
    component: faFilter
  },
  {
    value: 'faCube',
    label: <FontAwesomeIcon icon={faCube} />,
    component: faCube
  },
  {
    value: 'faCubes',
    label: <FontAwesomeIcon icon={faCubes} />,
    component: faCubes
  }
]