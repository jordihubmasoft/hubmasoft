import {
  Uil500px,
  UilAirplay,
  UilArrowGrowth,
  UilAt,
  UilBagAlt,
  UilBookAlt,
  UilBookOpen,
  UilBookReader,
  UilCalendarAlt,
  UilChartBar,
  UilChat,
  UilCheckSquare,
  UilCircle,
  UilClipboardAlt,
  UilClock,
  UilCompactDisc,
  UilCreateDashboard,
  UilDatabase,
  UilDocumentLayoutLeft,
  UilEdit,
  UilEnvelope,
  UilExchange,
  UilExclamationOctagon,
  UilExpandArrowsAlt,
  UilFile,
  UilFileShieldAlt,
  UilHeadphones,
  UilIcons,
  UilImages,
  UilLayerGroup,
  UilMap,
  UilPresentation,
  UilQuestionCircle,
  UilSearch,
  UilServer,
  UilSetting,
  UilShoppingCart,
  UilSquareFull,
  UilTable,
  UilUsdCircle,
  UilUsersAlt,
  UilWindowSection,
  UilEllipsisV,
} from '@iconscout/react-unicons';
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import versions from '../demoData/changelog.json';
import { useDispatch, useSelector } from 'react-redux';

import { changeMenuMode, changeDirectionMode, changeLayoutMode } from '../redux/themeLayout/actionCreator';

function MenuItems() {

    const path = '/admin';
    const { t } = useTranslation();

    interface RootState {
      ChangeLayoutMode: {
        topMenu: string;
      }
    }

    const { topMenu } = useSelector((state:RootState) => {
      return {
        topMenu: state.ChangeLayoutMode.topMenu,
      };
    });

    const router = useRouter();
    const { pathname } = router;
    const pathArray = pathname && pathname !== '/' ? pathname.split(path) : [];
    const mainPath = pathArray.length > 1 ? pathArray[1] : '';
    const mainPathSplit = mainPath.split('/');

    const [openKeys, setOpenKeys] = React.useState(
      !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
    );
    const [openItems, setOpenItems] = React.useState(
      !topMenu ? [ `${ mainPathSplit.length === 1 ? 'demo-1' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2] }`, ] : []
    );

    useEffect(() => {
      // Check if the current route matches the base path.
      if (pathname === path) {
        setOpenKeys(['dashboard']); // active menu key.
        setOpenItems(['demo-1']); // active menu item.
      }
    }, [pathname]);

    const onOpenChange = (keys:string[]) => {
      setOpenKeys(keys[keys.length - 1] !== 'recharts' && keys.length > 0 ? [keys[keys.length - 1]] : keys);
    };

    const onClick = (item:any) => {
      setOpenItems([item.key])
      if (item.keyPath.length === 1) setOpenKeys([]);
    };

    const dispatch = useDispatch();

    function getItem( label:React.ReactNode, key:string, icon:any, children:any) {
        return {
            label,
            key,
            icon,
            children,
        };
    }

    const items = [
        getItem(t('Dashboard'), 'dashboard', !topMenu && <UilCreateDashboard />, [
          getItem(
            <Link href={`${path}`}>
              {t('Dashboard')} {t('')}
            </Link>,
            'demo-1',
            null,
            null,
          ),
        ]),
        getItem(t('Contacto'), 'contact', !topMenu && <UilAt />, [
          getItem(
            <Link href={`${path}/contact/clients`}>
              {t('Clientes')}
            </Link>,
            'clients',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/contact/providers`}>
              {t('Proveedores')}
            </Link>,
            'providers',
            null,
            null,
          ),
        ]),
        getItem(t('Ventas'), 'ventas', !topMenu && <UilBagAlt />, [
          getItem(
            <Link href={`${path}/ventas/presupuestos`}>
              {t('Presupuestos')}
            </Link>,
            'presupuestos-ventas',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ventas/pedidos`}>
              {t('Pedidos')}
            </Link>,
            'pedidos-ventas',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ventas/albaranes`}>
              {t('Albaranes')}
            </Link>,
            'albaranes-ventas',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ventas/proformas`}>
              {t('Proformas')}
            </Link>,
            'proformas-ventas',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ventas/facturas`}>
              {t('Facturas')}
            </Link>,
            'facturas-ventas',
            null,
            null,
          ),
        ]),
        getItem(t('Compras'), 'compras', !topMenu && <UilBagAlt />, [
          getItem(
            <Link href={`${path}/compras/presupuestos`}>
              {t('Presupuestos')}
            </Link>,
            'presupuestos-compras',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/compras/pedidos`}>
              {t('Pedidos')}
            </Link>,
            'pedidos-compras',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/compras/albaranes`}>
              {t('Albaranes')}
            </Link>,
            'albaranes-compras',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/compras/proformas`}>
              {t('Proformas')}
            </Link>,
            'proformas-compras',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/compras/facturas`}>
              {t('Facturas')}
            </Link>,
            'facturas-compras',
            null,
            null,
          ),
        ]),
        getItem(t('inventario'), 'inventario', !topMenu && <UilChartBar />, [
          getItem(
            <Link href={`${path}/inventario/panel-control`}>
              {t('Panel de control')}
            </Link>,
            'panel-control',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/inventario/almacenes`}>
              {t('Almacenes')}
            </Link>,
            'almacenes',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/inventario/productos`}>
              {t('Productos')}
            </Link>,
            'productos',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/inventario/pedidos`}>
              {t('Pedidos')}
            </Link>,
            'pedidos',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/inventario/pedidos-venta`}>
              {t('Pedidos de venta')}
            </Link>,
            'pedidos-venta',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/inventario/pedidos-compra`}>
              {t('Pedidos de compra')}
            </Link>,
            'pedidos-compra',
            null,
            null,
          ),
        ]),
        getItem(t('contabilidad'), 'contabilidad', !topMenu && <UilUsersAlt />, [
          getItem(
            <Link href={`${path}/contabilidad/clashflow`}>
              {t('Clashflow')}
            </Link>,
            'clashflow',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/contabilidad/pagos-cobros`}>
              {t('Pagos y cobros')}
            </Link>,
            'pagos-cobros',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/contabilidad/impuestos`}>
              {t('Impuestos')}
            </Link>,
            'impuestos',
            null,
            null,
          ),
        ]),
        getItem(t('Empleados'), 'empleados', !topMenu && <UilFile />, [
          getItem(
            <Link href={`${path}/empleados`}>
              {t('Empleados')}
            </Link>,
            'empleados',
            null,
            null,
          ),
        ]),
        getItem(t('Proyectos'), 'proyectos', !topMenu && <UilEdit />, [
          getItem(
            <Link href={`${path}/proyectos`}>
              {t('Proyectos')}
            </Link>,
            'proyectos',
            null,
            null,
          ),
        ]),
    ];

    return (
        <Menu
            onClick={onClick}
            onOpenChange={onOpenChange}
            mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
            defaultSelectedKeys={openKeys}
            defaultOpenKeys={openItems}
            overflowedIndicator={<UilEllipsisV />}
            openKeys={openKeys}
            selectedKeys={openItems}
            items={items}
        />
    );
}

export default MenuItems;





