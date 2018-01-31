class MockCoreAPI {
  public static __get = jest.fn();
  public static __getAll = jest.fn();
  public static __update = jest.fn();
  public static __create = jest.fn();
  public static __head = jest.fn();
  public static __login = jest.fn();

  constructor() {
    (this as any).get = MockCoreAPI.__get;
    (this as any).getAll  = MockCoreAPI.__getAll;
    (this as any).update  = MockCoreAPI.__update;
    (this as any).create  = MockCoreAPI.__create;
    (this as any).head  = MockCoreAPI.__head;
    (this as any).login = MockCoreAPI.__login;
  }

  public static refresh() {
    MockCoreAPI.__get.mockReset();
    MockCoreAPI.__getAll.mockReset();
    MockCoreAPI.__update.mockReset();
    MockCoreAPI.__create.mockReset();
    MockCoreAPI.__head.mockReset();
    MockCoreAPI.__login.mockReset();
  }
}

export default MockCoreAPI;
