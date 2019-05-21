export const DB_NAME                     = 'seven23';
export const DB_VERSION                  = 11; // Cannot rollback after creation
export const API_DEFAULT_URL             = 'https://seven23.io';

export const ATTACHMENT_DELETE_REQUEST   = 'ATTACHMENT_DELETE_REQUEST';
export const UPDATE_ENCRYPTION           = 'UPDATE_ENCRYPTION';
export const ENCRYPTION_KEY_CHANGED      = 'ENCRYPTION_KEY_CHANGED';
export const ENCRYPTION_ERROR            = 'ENCRYPTION_ERROR';
export const FLUSH                       = 'FLUSH';

export const CATEGORIES_CREATE_REQUEST   = 'CATEGORIES_CREATE_REQUEST';
export const CATEGORIES_READ_REQUEST     = 'CATEGORIES_READ_REQUEST';
export const CATEGORIES_UPDATE_REQUEST   = 'CATEGORIES_UPDATE_REQUEST';
export const CATEGORIES_DELETE_REQUEST   = 'CATEGORIES_DELETE_REQUEST';
export const CATEGORIES_RESET            = 'CATEGORIES_RESET';
export const CATEGORIES_EXPORT           = 'CATEGORIES_EXPORT';

export const CHANGES_CREATE_REQUEST      = 'CHANGES_CREATE_REQUEST';
export const CHANGES_READ_REQUEST        = 'CHANGES_READ_REQUEST';
export const CHANGES_UPDATE_REQUEST      = 'CHANGES_UPDATE_REQUEST';
export const CHANGES_DELETE_REQUEST      = 'CHANGES_DELETE_REQUEST';
export const CHANGES_EXPORT              = 'CHANGES_EXPORT';

export const TRANSACTIONS_CREATE_REQUEST = 'TRANSACTIONS_CREATE_REQUEST';
export const TRANSACTIONS_READ_REQUEST   = 'TRANSACTIONS_READ_REQUEST';
export const TRANSACTIONS_UPDATE_REQUEST = 'TRANSACTIONS_UPDATE_REQUEST';
export const TRANSACTIONS_DELETE_REQUEST = 'TRANSACTIONS_DELETE_REQUEST';
export const TRANSACTIONS_EXPORT         = 'TRANSACTIONS_EXPORT';
export const TRANSACTIONS_SYNC_REQUEST   = 'TRANSACTIONS_SYNC_REQUEST';

export const ACCOUNTS_CREATE_REQUEST     = 'ACCOUNTS_CREATE_REQUEST';
export const ACCOUNTS_SYNC_REQUEST       = 'ACCOUNTS_SYNC_REQUEST';
export const ACCOUNTS_UPDATE_REQUEST     = 'ACCOUNTS_UPDATE_REQUEST';
export const ACCOUNTS_DELETE_REQUEST     = 'ACCOUNTS_DELETE_REQUEST';
export const ACCOUNTS_CURRENCY_REQUEST   = 'ACCOUNTS_CURRENCY_REQUEST';
export const ACCOUNTS_SWITCH_REQUEST     = 'ACCOUNTS_SWITCH_REQUEST';

export const ACCOUNTS_IMPORT             = 'ACCOUNTS_IMPORT';
export const ACCOUNTS_IMPORT_UPDATE      = 'ACCOUNTS_IMPORT_UPDATE';

export const CURRENCIES_SYNC_REQUEST     = 'CURRENCIES_SYNC_REQUEST';
export const CURRENCIES_CREATE_REQUEST   = 'CURRENCIES_CREATE_REQUEST';
export const CURRENCIES_READ_REQUEST     = 'CURRENCIES_READ_REQUEST';
export const CURRENCIES_UPDATE_REQUEST   = 'CURRENCIES_UPDATE_REQUEST';
export const CURRENCIES_DELETE_REQUEST   = 'CURRENCIES_DELETE_REQUEST';
export const CURRENCIES_RESET            = 'CURRENCIES_RESET';

export const USER_LOGIN                  = 'LOGIN';
export const USER_LOGOUT                 = 'LOGOUT';
export const USER_FETCH_PROFILE          = 'USER_FETCH_PROFILE';
export const USER_CREATE_REQUEST         = 'USER_CREATE_REQUEST';
export const USER_READ_REQUEST           = 'USER_READ_REQUEST';
export const USER_UPDATE_REQUEST         = 'USER_UPDATE_REQUEST';
export const USER_CHANGE_PASSWORD        = 'USER_CHANGE_PASSWORD';
export const USER_CHANGE_EMAIL           = 'USER_CHANGE_EMAIL';

export const USER_FETCH_TOKEN            = 'USER_FETCH_TOKEN';
export const USER_REVOKE_TOKEN           = 'USER_REVOKE_TOKEN';
export const USER_DELETE_REQUEST         = 'USER_DELETE_REQUEST';
export const USER_CHANGE_THEME           = 'USER_CHANGE_THEME';

// Update login sttus for UI
export const USER_START_LOGIN            = 'USER_START_LOGIN';
export const USER_STOP_LOGIN             = 'USER_STOP_LOGIN';

export const SERVER_CONNECTING           = 'SERVER_CONNECTING';
export const SERVER_CONNECT              = 'SERVER_CONNECT';
export const SERVER_CONNECT_FAIL         = 'SERVER_CONNECT_FAIL';
export const SERVER_DISCONNECT           = 'SERVER_DISCONNECT';
export const SERVER_SYNC                 = 'SERVER_SYNC';
export const SERVER_SYNCED               = 'SERVER_SYNCED';
export const SERVER_LOADED               = 'SERVER_LOADED';
export const SERVER_LOGGED               = 'SERVER_LOGGED';
export const SERVER_LAST_EDITED          = 'SERVER_LAST_EDITED';
export const SERVER_INIT                 = 'SERVER_INIT';
export const SERVER_UNDER_MAINTENANCE    = 'SERVER_UNDER_MAINTENANCE';
export const SERVER_ERROR                = 'SERVER_ERROR';

export const STATISTICS_DASHBOARD        = 'STATISTICS_DASHBOARD';
export const STATISTICS_VIEWER           = 'STATISTICS_VIEWER';
export const STATISTICS_PER_DATE         = 'STATISTICS_PER_DATE';
export const STATISTICS_PER_CATEGORY     = 'STATISTICS_PER_CATEGORY';

export const REPORT_SET_DATES            = 'REPORT_SET_DATES';
export const NAVIGATE                    = 'NAVIGATE';
export const SNACKBAR                    = 'SNACKBAR';

export const CHANGE_EVENT                = 'CHANGE_EVENT';
export const ADD_EVENT                   = 'ADD_EVENT';
export const DELETE_EVENT                = 'DELETE_EVENT';
export const UPDATE_EVENT                = 'UPDATE_EVENT';