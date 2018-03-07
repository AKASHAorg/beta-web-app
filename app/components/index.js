import startScreen from "./setup/start-screen";

/* eslint-disable import/no-named-as-default */
export const AddImage = Loadable({
    loader: () => import( /* webpackChunkName: "AddImage" */'./comment/add-image'),
    loading: Loading,
});

export const AddToBoard = Loadable({
    loader: () => import( /* webpackChunkName: "AddToBoard" */'./popovers/add-to-board'),
    loading: Loading,
});

export const AddToBoardPopover = Loadable({
    loader: () => import( /* webpackChunkName: "AddToBoardPopover" */'./popovers/add-to-board-popover'),
    loading: Loading,
});

export const AethWallet = Loadable({
    loader: () => import( /* webpackChunkName: "AethWallet" */'./wallets/aeth-wallet'),
    loading: Loading,
});

export const AppPreferences = Loadable({
    loader: () => import( /* webpackChunkName: "AppPreferences" */'./profile-overview/app-preferences'),
    loading: Loading,
});

export const Auth = Loadable({
    loader: () => import( /* webpackChunkName: "Auth" */'./setup/auth'),
    loading: Loading,
});

export const AuthProfileList = Loadable({
    loader: () => import( /* webpackChunkName: "AuthProfileList" */'./setup/auth-profile-list'),
    loading: Loading,
});

export const Avatar = Loadable({
    loader: () => import( /* webpackChunkName: "Avatar" */'./avatar/avatar'),
    loading: Loading,
});

export const AvatarEditor = Loadable({
    loader: () => import( /* webpackChunkName: "AvatarEditor" */'./avatar/avatar-editor'),
    loading: Loading,
});

export const Balance = Loadable({
    loader: () => import( /* webpackChunkName: "Balance" */'./balance'),
    loading: Loading,
});

export const ClaimableList = Loadable({
    loader: () => import( /* webpackChunkName: "ClaimableList" */'./claimable-list'),
    loading: Loading,
});

export const Column = Loadable({
    loader: () => import( /* webpackChunkName: "Column" */'./columns/column'),
    loading: Loading,
});

export const ColumnHeader = Loadable({
    loader: () => import( /* webpackChunkName: "ColumnHeader" */'./columns/column-header'),
    loading: Loading,
});

export const ConfirmationDialog = Loadable({
    loader: () => import( /* webpackChunkName: "ConfirmationDialog" */'./dialogs/confirmation-dialog'),
    loading: Loading,
});

export const Comment = Loadable({
    loader: () => import( /* webpackChunkName: "Comment" */'./comment/comment'),
    loading: Loading,
});

export const CommentEditor = Loadable({
    loader: () => import( /* webpackChunkName: "CommentEditor" */'./comment/comment-editor'),
    loading: Loading,
});

export const CommentHighlight = Loadable({
    loader: () => import( /* webpackChunkName: "CommentHighlight" */'./comment/comment-highlight'),
    loading: Loading,
});

export const CommentsList = Loadable({
    loader: () => import( /* webpackChunkName: "CommentsList" */'./comment/comments-list'),
    loading: Loading,
});

export const CommentThread = Loadable({
    loader: () => import( /* webpackChunkName: "CommentThread" */'./comment/comment-thread'),
    loading: Loading,
});

export const Configuration = Loadable({
    loader: () => import( /* webpackChunkName: "Configuration" */'./setup/configuration'),
    loading: Loading,
});

export const CyclingAeth = Loadable({
    loader: () => import( /* webpackChunkName: "CyclingAeth" */'./wallets/cycling-aeth'),
    loading: Loading,
});

export const Dashboard = Loadable({
    loader: () => import( /* webpackChunkName: "Dashboard" */'./dashboard'),
    loading: Loading,
});

export const DashboardSecondarySidebar = Loadable({
    loader: () => import( /* webpackChunkName: "DashboardSecondarySidebar" */'./secondary-sidebars/dashboard-secondary-sidebar'),
    loading: Loading,
});

export const DashboardSidebarRow = Loadable({
    loader: () => import( /* webpackChunkName: "DashboardSidebarRow" */'./secondary-sidebars/dashboard-sidebar-row'),
    loading: Loading,
});

export const DashboardTopBar = Loadable({
    loader: () => import( /* webpackChunkName: "DashboardTopBar" */'./top-bars/dashboard-top-bar'),
    loading: Loading,
});

export const DataLoader = Loadable({
    loader: () => import( /* webpackChunkName: "DataLoader" */'./data-loader'),
    loading: Loading,
});

export const DisplayName = Loadable({
    loader: () => import( /* webpackChunkName: "DisplayName" */'./display-name'),
    loading: Loading,
});

export const EditListBtn = Loadable({
    loader: () => import( /* webpackChunkName: "EditListBtn" */'./profile-overview/edit-list-btn'),
    loading: Loading,
});

export const EditorLinkInput = Loadable({
    loader: () => import( /* webpackChunkName: "EditorLinkInput" */'./forms/editor-link-input'),
    loading: Loading,
});

export const EntryCard = Loadable({
    loader: () => import( /* webpackChunkName: "EntryCard" */'./cards/entry-card'),
    loading: Loading,
});

export const EntryCardHeader = Loadable({
    loader: () => import( /* webpackChunkName: "EntryCardHeader" */'./cards/entry-card-header'),
    loading: Loading,
});

export const EntryList = Loadable({
    loader: () => import( /* webpackChunkName: "EntryList" */'./entry-list'),
    loading: Loading,
});

export const EntryPage = Loadable({
    loader: () => import( /* webpackChunkName: "EntryPage" */'./entry/entry-page'),
    loading: Loading,
});

export const EntryPageActions = Loadable({
    loader: () => import( /* webpackChunkName: "EntryPageActions" */'./entry/entry-page-actions'),
    loading: Loading,
});

export const EntryPageContent = Loadable({
    loader: () => import( /* webpackChunkName: "EntryPageContent" */'./entry/entry-page-content'),
    loading: Loading,
});

export const EntryPageHeader = Loadable({
    loader: () => import( /* webpackChunkName: "EntryPageHeader" */'./entry/entry-page-header'),
    loading: Loading,
});

export const EntrySecondarySidebarItem = Loadable({
    loader: () => import( /* webpackChunkName: "EntrySecondarySidebarItem" */'./entry-secondary-sidebar-item'),
    loading: Loading,
});

export const EntryVersionTimeline = Loadable({
    loader: () => import( /* webpackChunkName: "EntryVersionTimeline" */'./timelines/entry-version-timeline'),
    loading: Loading,
});

export const ErrorNotification = Loadable({
    loader: () => import( /* webpackChunkName: "ErrorNotification" */'./notifications/error-notification'),
    loading: Loading,
});

export const EssenceHistory = Loadable({
    loader: () => import( /* webpackChunkName: "EssenceHistory" */'./essence-history'),
    loading: Loading,
});

export const EssencePopover = Loadable({
    loader: () => import( /* webpackChunkName: "EssencePopover" */'./popovers/essence-popover'),
    loading: Loading,
});

export const EthWallet = Loadable({
    loader: () => import( /* webpackChunkName: "EthWallet" */'./wallets/eth-wallet'),
    loading: Loading,
});

export const FaucetAndManafyModal = Loadable({
    loader: () => import( /* webpackChunkName: "FaucetAndManafyModal" */'./modals/faucet-and-manafy-modal'),
    loading: Loading,
});

export const FollowButton = Loadable({
    loader: () => import( /* webpackChunkName: "FollowButton" */'./follow-button'),
    loading: Loading,
});

export const FullSizeImageViewer = Loadable({
    loader: () => import( /* webpackChunkName: "FullSizeImageViewer" */'./image-viewer/full-size-image-viewer'),
    loading: Loading,
});

export const GethCacheSelect = Loadable({
    loader: () => import( /* webpackChunkName: "GethCacheSelect" */'./forms/geth-cache-select'),
    loading: Loading,
});

export const GethDetailsModal = Loadable({
    loader: () => import( /* webpackChunkName: "GethDetailsModal" */'./modals/geth-details-modal'),
    loading: Loading,
});

export const Highlights = Loadable({
    loader: () => import( /* webpackChunkName: "Highlights" */'./profile-overview/highlights'),
    loading: Loading,
});

export const HighlightCard = Loadable({
    loader: () => import( /* webpackChunkName: "HighlightCard" */'./cards/highlight-card'),
    loading: Loading,
});

export const HighlightHeader = Loadable({
    loader: () => import( /* webpackChunkName: "HighlightHeader" */'./cards/highlight-header'),
    loading: Loading,
});

export const HistoryTable = Loadable({
    loader: () => import( /* webpackChunkName: "HistoryTable" */'./history-table'),
    loading: Loading,
});

export const Icon = Loadable({
    loader: () => import( /* webpackChunkName: "Icon" */'./icon'),
    loading: Loading,
});

export const ImageUploader = Loadable({
    loader: () => import( /* webpackChunkName: "ImageUploader" */'./image-uploader/image-uploader'),
    loading: Loading,
});

export const Input = Loadable({
    loader: () => import( /* webpackChunkName: "Input" */'./common/input.js'),
    loading: Loading,
});

export const InputNumber = Loadable({
    loader: () => import( /* webpackChunkName: "InputNumber" */'./common/input-number.js'),
    loading: Loading,
});

export const IpfsDetailsModal = Loadable({
    loader: () => import( /* webpackChunkName: "IpfsDetailsModal" */'./modals/ipfs-details-modal'),
    loading: Loading,
});

export const KarmaPopover = Loadable({
    loader: () => import( /* webpackChunkName: "KarmaPopover" */'./popovers/karma-popover'),
    loading: Loading,
});

export const LatestColumn = Loadable({
    loader: () => import( /* webpackChunkName: "LatestColumn" */'./columns/latest-column'),
    loading: Loading,
});

export const LinkPopover = Loadable({
    loader: () => import( /* webpackChunkName: "LinkPopover" */'./popovers/link-popover'),
    loading: Loading,
});

export const Lists = Loadable({
    loader: () => import( /* webpackChunkName: "Lists" */'./profile-overview/lists'),
    loading: Loading,
});

export const ListEntries = Loadable({
    loader: () => import( /* webpackChunkName: "ListEntries" */'./profile-overview/list-entries'),
    loading: Loading,
});

export const ListCard = Loadable({
    loader: () => import( /* webpackChunkName: "ListCard" */'./cards/list-card'),
    loading: Loading,
});

export const ListColumn = Loadable({
    loader: () => import( /* webpackChunkName: "ListColumn" */'./columns/list-column'),
    loading: Loading,
});

export const ListPopover = Loadable({
    loader: () => import( /* webpackChunkName: "ListPopover" */'./popovers/list-popover'),
    loading: Loading,
});

export const LogsDetails = Loadable({
    loader: () => import( /* webpackChunkName: "LogsDetails" */'./logs/logs-details'),
    loading: Loading,
});

export const LogsList = Loadable({
    loader: () => import( /* webpackChunkName: "LogsList" */'./logs/logs-list'),
    loading: Loading,
});

export const LoginForm = Loadable({
    loader: () => import( /* webpackChunkName: "LoginForm" */'./forms/login-form'),
    loading: Loading,
});

export const ManaPopover = Loadable({
    loader: () => import( /* webpackChunkName: "ManaPopover" */'./popovers/mana-popover'),
    loading: Loading,
});

export const MentionDecorators = Loadable({
    loader: () => import( /* webpackChunkName: "MentionDecorators" */'./mention-decorator/mention-decorator'),
    loading: Loading,
});

export const MentionSuggestions = Loadable({
    loader: () => import( /* webpackChunkName: "MentionSuggestions" */'./mention-suggestions/mention-suggestions'),
    loading: Loading,
});

export const MyEntries = Loadable({
    loader: () => import( /* webpackChunkName: "MyEntries" */'./profile-overview/my-entries'),
    loading: Loading,
});

export const NavigateAwayModal = Loadable({
    loader: () => import( /* webpackChunkName: "NavigateAwayModal" */'./modals/navigate-away-modal'),
    loading: Loading,
});

export const Navigation = Loadable({
    loader: () => import( /* webpackChunkName: "Navigation" */'./top-bars/navigation'),
    loading: Loading,
});

export const NavigationModal = Loadable({
    loader: () => import( /* webpackChunkName: "NavigationModal" */'./modals/navigation-modal'),
    loading: Loading,
});

export const NewColumn = Loadable({
    loader: () => import( /* webpackChunkName: "NewColumn" */'./columns/new-column'),
    loading: Loading,
});

export const NewEntrySecondarySidebar = Loadable({
    loader: () => import( /* webpackChunkName: "NewEntrySecondarySidebar" */'./secondary-sidebars/new-entry-secondary-sidebar'),
    loading: Loading,
});

export const NewEntryTopBar = Loadable({
    loader: () => import( /* webpackChunkName: "NewEntryTopBar" */'./top-bars/new-entry-top-bar'),
    loading: Loading,
});

export const NewDashboardForm = Loadable({
    loader: () => import( /* webpackChunkName: "NewDashboardForm" */'./forms/new-dashboard-form'),
    loading: Loading,
});

export const NewIdentityInterests = Loadable({
    loader: () => import( /* webpackChunkName: "NewIdentityInterests" */'./setup/new-identity-interests'),
    loading: Loading,
});

export const NewListForm = Loadable({
    loader: () => import( /* webpackChunkName: "NewListForm" */'./forms/new-list-form'),
    loading: Loading,
});

export const NewListBtn = Loadable({
    loader: () => import( /* webpackChunkName: "NewListBtn" */'./profile-overview/new-list-btn'),
    loading: Loading,
});

export const NewSearchColumn = Loadable({
    loader: () => import( /* webpackChunkName: "NewSearchColumn" */'./columns/new-search-column'),
    loading: Loading,
});

export const NewSelectColumn = Loadable({
    loader: () => import( /* webpackChunkName: "NewSelectColumn" */'./columns/new-select-column'),
    loading: Loading,
});

export const Notification = Loadable({
    loader: () => import( /* webpackChunkName: "Notification" */'./notifications/notification'),
    loading: Loading,
});

export const NotificationHighlightNote = Loadable({
    loader: () => import( /* webpackChunkName: "NotificationHighlightNote" */'./notifications/notification-highlight-note'),
    loading: Loading,
});

export const NotificationLog = Loadable({
    loader: () => import( /* webpackChunkName: "NotificationLog" */'./panels/notification-log'),
    loading: Loading,
});

export const NotificationsPanel = Loadable({
    loader: () => import( /* webpackChunkName: "NotificationsPanel" */'./panels/notifications-panel'),
    loading: Loading,
});

export const NoMana = Loadable({
    loader: () => import( /* webpackChunkName: "NoMana" */'./modals/no-mana'),
    loading: Loading,
});

export const NoEth = Loadable({
    loader: () => import( /* webpackChunkName: "NoEth" */'./modals/no-eth'),
    loading: Loading,
});

export const OptimisticComment = Loadable({
    loader: () => import( /* webpackChunkName: "OptimisticComment" */'./comment/optimistic-comment'),
    loading: Loading,
});

export const PageContent = Loadable({
    loader: () => import( /* webpackChunkName: "PageContent" */'./page-content'),
    loading: Loading,
});

export const PanelContainerFooter = Loadable({
    loader: () => import( /* webpackChunkName: "PanelContainerFooter" */'./panel-container/panel-container-footer'),
    loading: Loading,
});

export const PathInputField = Loadable({
    loader: () => import( /* webpackChunkName: "PathInputField" */'./common/path-input-field'),
    loading: Loading,
});

export const PieChart = Loadable({
    loader: () => import( /* webpackChunkName: "PieChart" */'./charts/pie-chart'),
    loading: Loading,
});

export const PlusSquareIcon = Loadable({
    loader: () => import( /* webpackChunkName: "PlusSquareIcon" */'./plus-square-icon'),
    loading: Loading,
});

export const PreviewPanel = Loadable({
    loader: () => import( /* webpackChunkName: "PreviewPanel" */'./panels/preview-panel'),
    loading: Loading,
});

export const ProfileActivity = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileActivity" */'./profile/profile-activity'),
    loading: Loading,
});

export const ProfileCard = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileCard" */'./cards/profile-card'),
    loading: Loading,
});

export const ProfileCardHeader = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileCardHeader" */'./cards/profile-card-header'),
    loading: Loading,
});

export const ProfileColumn = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileColumn" */'./columns/profile-column'),
    loading: Loading,
});

export const ProfileComplete = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileComplete" */'./setup/profile-complete'),
    loading: Loading,
});

export const ProfileCompleteForm = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileCompleteForm" */'./forms/profile-complete-form'),
    loading: Loading,
});

export const ProfileDetails = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileDetails" */'./profile/profile-details'),
    loading: Loading,
});

export const ProfileEdit = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileEdit" */'./profile-edit'),
    loading: Loading,
});

export const ProfileEditForm = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileEditForm" */'./forms/profile-edit-form'),
    loading: Loading,
});

export const ProfileEntriesColumn = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileEntriesColumn" */'./columns/profile-entries-column'),
    loading: Loading,
});

export const ProfileFollowersColumn = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileFollowersColumn" */'./columns/profile-followers-column'),
    loading: Loading,
});

export const ProfileFollowingsColumn = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileFollowingsColumn" */'./columns/profile-followings-column'),
    loading: Loading,
});

export const ProfileList = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileList" */'./profile-list'),
    loading: Loading,
});

export const ProfileOverviewSecondarySidebar = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileOverviewSecondarySidebar" */'./secondary-sidebars/profile-overview-secondary-sidebar'),
    loading: Loading,
});

export const ProfilePage = Loadable({
    loader: () => import( /* webpackChunkName: "ProfilePage" */'./profile/profile-page'),
    loading: Loading,
});

export const ProfilePageTopBar = Loadable({
    loader: () => import( /* webpackChunkName: "ProfilePageTopBar" */'./top-bars/profile-page-top-bar'),
    loading: Loading,
});

export const ProfilePopover = Loadable({
    loader: () => import( /* webpackChunkName: "ProfilePopover" */'./popovers/profile-popover'),
    loading: Loading,
});

export const ProfileSettings = Loadable({
    loader: () => import( /* webpackChunkName: "ProfileSettings" */'./profile-overview/profile-settings'),
    loading: Loading,
});

export const PublishOptionsPanel = Loadable({
    loader: () => import( /* webpackChunkName: "PublishOptionsPanel" */'./panels/publish-options-panel'),
    loading: Loading,
});

export const RadarChart = Loadable({
    loader: () => import( /* webpackChunkName: "RadarChart" */'./charts/radar-chart'),
    loading: Loading,
});

export const RememberPassphrase = Loadable({
    loader: () => import( /* webpackChunkName: "RememberPassphrase" */'./forms/remember-passphrase'),
    loading: Loading,
});

export const RememberPassphraseSelect = Loadable({
    loader: () => import( /* webpackChunkName: "RememberPassphraseSelect" */'./forms/remember-passphrase-select'),
    loading: Loading,
});

export const SecondarySidebar = Loadable({
    loader: () => import( /* webpackChunkName: "SecondarySidebar" */'./secondary-sidebars/secondary-sidebar'),
    loading: Loading,
});

export const Select = Loadable({
    loader: () => import( /* webpackChunkName: "Select" */'./common/select'),
    loading: Loading,
});

export const SelectableEditor = Loadable({
    loader: () => import( /* webpackChunkName: "SelectableEditor" */'./editors/selectable-editor'),
    loading: Loading,
});

export const SendTipForm = Loadable({
    loader: () => import( /* webpackChunkName: "SendTipForm" */'./forms/send-tip-form'),
    loading: Loading,
});

export const ServiceDetailsModal = Loadable({
    loader: () => import( /* webpackChunkName: "ServiceDetailsModal" */'./modals/service-details-modal'),
    loading: Loading,
});

export const ServiceStatusBar = Loadable({
    loader: () => import( /* webpackChunkName: "ServiceStatusBar" */'./service-status-bar'),
    loading: Loading,
});

export const SetupHeader = Loadable({
    loader: () => import( /* webpackChunkName: "SetupHeader" */'./setup/setup-header'),
    loading: Loading,
});

export const SetupHeaderSplit = Loadable({
    loader: () => import( /* webpackChunkName: "SetupHeaderSplit" */'./setup/setup-header-split'),
    loading: Loading,
});

export const SetupPages = Loadable({
    loader: () => import( /* webpackChunkName: "SetupPages" */'./setup/setup-pages'),
    loading: Loading,
});

export const ShareLinkModal = Loadable({
    loader: () => import( /* webpackChunkName: "ShareLinkModal" */'./modals/share-link-modal'),
    loading: Loading,
});

export const ShiftForm = Loadable({
    loader: () => import( /* webpackChunkName: "ShiftForm" */'./forms/shift-form'),
    loading: Loading,
});

export const Sidebar = Loadable({
    loader: () => import( /* webpackChunkName: "Sidebar" */'./sidebar'),
    loading: Loading,
});

export const SidebarIcon = Loadable({
    loader: () => import( /* webpackChunkName: "SidebarIcon" */'./sidebar-icon'),
    loading: Loading,
});

export const StartScreen = Loadable({
    loader: () => import( /* webpackChunkName: "StartScreen" */'./setup/start-screen'),
    loading: Loading,
});

export const StreamColumn = Loadable({
    loader: () => import( /* webpackChunkName: "StreamColumn" */'./columns/stream-column'),
    loading: Loading,
});

export const SvgIcon = Loadable({
    loader: () => import( /* webpackChunkName: "SvgIcon" */'./svg-icon/svg-icon'),
    loading: Loading,
});

export const SyncProgressLoader = Loadable({
    loader: () => import( /* webpackChunkName: "SyncProgressLoader" */'./setup/sync-progress'),
    loading: Loading,
});

export const SyncStatus = Loadable({
    loader: () => import( /* webpackChunkName: "SyncStatus" */'./setup/sync-status'),
    loading: Loading,
});

export const Sync = Loadable({
    loader: () => import( /* webpackChunkName: "Sync" */'./setup/sync'),
    loading: Loading,
});

export const TagColumn = Loadable({
    loader: () => import( /* webpackChunkName: "TagColumn" */'./columns/tag-column'),
    loading: Loading,
});

export const TagEditor = Loadable({
    loader: () => import( /* webpackChunkName: "TagEditor" */'./tag-editor'),
    loading: Loading,
});

export const TagList = Loadable({
    loader: () => import( /* webpackChunkName: "TagList" */'./tag-list/tag-list'),
    loading: Loading,
});

export const TagListItem = Loadable({
    loader: () => import( /* webpackChunkName: "TagListItem" */'./tag-list/tag-list-item'),
    loading: Loading,
});

export const TagListInterests = Loadable({
    loader: () => import( /* webpackChunkName: "TagListInterests" */'./tag-list/tag-list-item'),
    loading: Loading,
});

export const TagPopover = Loadable({
    loader: () => import( /* webpackChunkName: "TagPopover" */'./popovers/tag-popover'),
    loading: Loading,
});

export const Terms = Loadable({
    loader: () => import( /* webpackChunkName: "Terms" */'./terms'),
    loading: Loading,
});

export const TextEntryEditor = Loadable({
    loader: () => import( /* webpackChunkName: "TextEntryEditor" */'./text-entry-editor'),
    loading: Loading,
});

export const TipPopover = Loadable({
    loader: () => import( /* webpackChunkName: "TipPopover" */'./popovers/tip-popover'),
    loading: Loading,
});

export const TopBar = Loadable({
    loader: () => import( /* webpackChunkName: "TopBar" */'./top-bars/top-bar'),
    loading: Loading,
});

export const TopBarIcon = Loadable({
    loader: () => import( /* webpackChunkName: "TopBarIcon" */'./top-bars/dashboard-top-bar-icon'),
    loading: Loading,
});

export const TopBarRight = Loadable({
    loader: () => import( /* webpackChunkName: "TopBarRight" */'./top-bars/top-bar-right'),
    loading: Loading,
});

export const TransactionLog = Loadable({
    loader: () => import( /* webpackChunkName: "TransactionLog" */'./panels/transaction-log'),
    loading: Loading,
});

export const TransactionsLogPanel = Loadable({
    loader: () => import( /* webpackChunkName: "TransactionsLogPanel" */'./panels/transactions-log-panel'),
    loading: Loading,
});

export const TransferForm = Loadable({
    loader: () => import( /* webpackChunkName: "TransferForm" */'./forms/transfer-form'),
    loading: Loading,
});

export const TransformForm = Loadable({
    loader: () => import( /* webpackChunkName: "TransformForm" */'./forms/transform-form'),
    loading: Loading,
});

export const UrlInput = Loadable({
    loader: () => import(/* webpackChunkName: "UrlInput" */'./forms/url-input'),
    loading: Loading,
});

export const VotesModal = Loadable({
    loader: () => import(/* webpackChunkName: "VotesModal" */'./modals/votes-modal'),
    loading: Loading,
});

export const VotePopover = Loadable({
    loader: () => import(/* webpackChunkName: "VotePopover" */'./popovers/vote-popover'),
    loading: Loading,
});

export const WalletPanel = Loadable({
    loader: () => import(/* webpackChunkName: "WalletPanel" */'./panels/wallet-panel'),
    loading: Loading,
});

export const WebsiteInfoCard = Loadable({
    loader: () => import(/* webpackChunkName: "WebsiteInfoCard" */'./cards/website-info-card'),
    loading: Loading,
});

export const WebPlaceholder = Loadable({
    loader: () => import(/* webpackChunkName: "WebPlaceholder" */'./web-placeholder'),
    loading: Loading,
});
/* eslint-enable import/no-named-as-default */
