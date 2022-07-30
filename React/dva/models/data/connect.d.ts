import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { RouteData } from 'umi/router';
import { BreakdownModalState } from '@/models/data/breakdownData';
import { MyLayoutModelState } from '@/models/data/myLayoutData';
import { OilModelState } from '@/models/data/oilData';
import { CareModelState } from '@/models/data/careData';
import { QualityModelState } from '@/models/data/qualityData';
import { HealthModelState } from '@/models/data/healthData';
import { HomeModelState } from '@/models/data/homeData';
import { ReportModelState } from '@/models/data/reportData';
import { UserModelState } from '@/models/user';
import { UsersModelState } from '@/models/data/usersData';

export {
  BreakdownModalState,
  MyLayoutModelState,
  OilModelState,
  CareModelState,
  QualityModelState,
  HealthModelState,
  HomeModelState,
  ReportModelState,
  UsersModelState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    breakdown?: boolean;
    myLayout?: boolean;
    care?: boolean;
    health?: boolean;
    quality?: boolean;
    oil?: boolean;
    operation?: boolean;
    info?: boolean;
    home?: boolean;
    report?: boolean;
    user: boolean;
    users?: boolean;
  };
}

export interface ConnectState {
  breakdown: BreakdownModalState;
  myLayout: MyLayoutModelState;
  oil: OilModelState;
  care: CareModelState;
  loading: Loading;
  quality: QualityModelState;
  health: HealthModelState;
  home: HomeModelState;
  report: ReportModelState;
  user: UserModelState;
  users: UsersModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?<K = any>(action: AnyAction): K;
}
