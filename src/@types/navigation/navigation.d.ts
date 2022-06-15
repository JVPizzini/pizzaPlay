export type ProductNavigationProps = {
  id?: string;
};

export type OrderNavigationProps = {
  id?: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      // signin: undefined;
      home: undefined;
      product: ProductNavigationProps;
      order: OrderNavigationProps;
      orders: undefined;
    }
  }
}
