export enum EBackendRequests {
  // User-related
  FETCH_ONE_USER = 'backend::users::fetchOne',
  CREATE_USER = 'backend::users::create',

  // Collections-related
  FETCH_ONE_COLLECTION = 'backend::userCollections::fetchOne',
  
  FETCH_COLLECTION_TASKS = 'backend::userCollections::fetchTasks',

  PIN_COLLECTION = 'backend::userCollections::pin',
  UNPIN_COLLECTION = 'backend::userCollections::unpin',

  FETCH_USER_COLLECTIONS = 'backend::userCollections::fetchAll',
  FETCH_PINNED_USER_COLLECTIONS = 'backend::userCollections::fetchPinned',
  // SEARCH_USER_COLLECTIONS = 'backend::userCollections::search',

  CREATE_COLLECTION = 'backend::userCollections::create',

  // Tasks-related
  FETCH_ONE_TASK = 'backend::userTasks:fetchOne',

  PIN_TASK = 'backend::userTasks::pin',
  UNPIN_TASK = 'backend::userTasks::unpin',

  FETCH_USER_TASKS = 'backend::userTasks::fetchAll',
  CREATE_TASK = 'backend::userTasks::create',

  // TaskSessions-related
  FETCH_ONE_TASK_SESSION ='backend::taskSessions::fetchOne',
  FETCH_TASK_SESSIONS = 'backend::taskSessions::fetchByTask',

  START_TASK_SESSION = 'backend::taskSessions::start',
  END_TASK_SESSION = 'backend::taskSessions::end',
};