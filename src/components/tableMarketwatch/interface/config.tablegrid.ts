import { TDefColDef, TRowDataIndex } from "./interface.tablegrid";

export const gridOptions = {
  rowStyle: { background: 'black' },
  headerHeight: 30,
  getRowId: function (e: any) {
    return e.data.RowID;
  },
 
  defaultColDef: {
    resizable: false,
    sortable: true,
    suppressMovable: true,
    flex: 1,
  },
  suppressCellSelection: true,
  suppressRowClickSelection: true,
  suppressContextMenu: true,
  suppressCellContextMenu: true,
  suppressRowContextMenu: true,
  autoGroupColumnDef: {
    // use font awesome for first col, with numbers for sort
    icons: {
      sortAscending: '<i class="fa fa-caret-up !text-base pr-0.5 center-horizontal"/>',
      sortDescending: '<i class="fa fa-caret-down !text-base pr-0.5 center-horizontal"/>',
    },
  },
  icons: {
    sortAscending: '<i class="fa fa-caret-down !text-base pr-0.5 center-horizontal"/>',
    sortDescending: '<i class="fa fa-caret-up !text-base pr-0.5 center-horizontal"/>',
  },


  // };
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // })
};

export const defaultColDef: TDefColDef = {
  width: 100,
  sortable: true,
  filter: true,
  autoSize: true,
};

export const RowDataIndex: TRowDataIndex = {
  MCK: 0,
  TC: 1,
  Tran: 2,
  San: 3,
  KL4: 4,
  G3: 5,
  KL3: 6,
  G2: 7,
  KL2: 8,
  G1: 9,
  KL1: 10,
  GiaKhop: 11,
  KLKhop: 12,
  Chenhlech: 13,
  G1B: 14,
  KL1B: 15,
  G2B: 16,
  KL2B: 17,
  G3B: 18,
  KL3B: 19,
  KL4B: 20,
  TKL: 21,
  MOC: 22,
  CaoNhat: 23,
  ThapNhat: 24,
  GTB: 25,
  NNMua: 26,
  NNBan: 27,
  RoomCL: 28,
  GDK: 29,
  Quyen: 30,
  CGKGN: 31,
  PhanTram: 32,
  //   RowID: String,
};


