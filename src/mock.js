const DYNAMIC_MODULES = {
  'layout-content-page-editor-web@2.0.3/page_editor/plugins/comments/index': import(
    'page_editor/plugins/comments/index'
  ),
  'layout-content-page-editor-web@2.0.3/page_editor/plugins/page-structure/index': import(
    'page_editor/plugins/page-structure/index'
  ),
  'layout-content-page-editor-web@2.0.3/page_editor/plugins/contents/index': import(
    'page_editor/plugins/contents/index'
  ),
  'layout-content-page-editor-web@2.0.3/page_editor/plugins/widgets/index': import(
    'page_editor/plugins/widgets/index'
  ),
  'layout-content-page-editor-web@2.0.3/page_editor/plugins/experience/index': import(
    'page_editor/plugins/experience/index'
  ),
  'layout-content-page-editor-web@2.0.3/page_editor/plugins/fragments/index': import(
    'page_editor/plugins/fragments/index'
  ),
};

window.Liferay = {
  fire: () => {},
  zIndex: {},

  Language: {
    get: str => str,
  },

  Loader: {
    require: (deps, cb, errorCb) => {
      Promise.all(deps.map(dep => DYNAMIC_MODULES[dep]))
        .then(modules => {
          if (modules.some(module => !module)) {
            throw new Error('Some deps not found\n' + deps.join('\n'));
          }

          cb(...modules);
        })
        .catch(errorCb);
    },
  },
};

export default {
  portletId:
    'com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet',
  state: {
    layoutData: {
      rootItems: {
        main: 'main',
      },
      items: {
        main: {
          itemId: 'main',
          children: [],
          type: 'root',
          config: {},
          parentId: null,
        },
      },
      version: 1,
    },
    fragmentEntryLinks: {},
    segmentsExperienceId: '0',
    availableSegmentsExperiences: {
      '0': {
        hasLockedSegmentsExperiment: false,
        segmentsExperimentURL: '/web/guest/cpa?segmentsExperienceId=0',
        segmentsExperienceId: '0',
        segmentsEntryId: '0',
        name: 'Default',
        segmentsExperimentStatus: null,
        priority: -1,
      },
    },
    languageId: 'en_US',
    showResolvedComments: false,
    mappedInfoItems: [],
    pageContents: [],
  },
  componentId: null,
  locale: {
    ISO3Country: 'USA',
    ISO3Language: 'eng',
    country: 'US',
    displayCountry: 'United States',
    displayLanguage: 'English',
    displayName: 'English (United States)',
    displayScript: '',
    displayVariant: '',
    extensionKeys: [],
    language: 'en',
    script: '',
    unicodeLocaleAttributes: [],
    unicodeLocaleKeys: [],
    variant: '',
  },
  config: {
    pluginsRootPath: 'layout-content-page-editor-web@2.0.3/page_editor/plugins',
    editSegmentsEntryURL:
      '/group/guest/~/control_panel/manage/-/segments/entries/new?_com_liferay_segments_web_internal_portlet_SegmentsPortlet_redirect=%2Fweb%2Fguest%2Fcpa1%3Fp_l_mode%3Dedit%26p_l_back_url%3D%252Fgroup%252Fguest%252F%7E%252Fcontrol_panel%252Fmanage%253Fp_p_id%253Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%2526p_p_lifecycle%253D0%2526p_p_state%253Dmaximized%2526p_v_l_s_g_id%253D20119%2526p_p_auth%253DDHDngvfP%26p_p_state%3Dnormal&p_p_auth=W9x6ITku',
    lookAndFeelURL:
      '/group/guest/~/control_panel/manage?p_p_id=com_liferay_layout_admin_web_portlet_GroupPagesPortlet&p_p_lifecycle=0&p_p_state=maximized&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_mvcRenderCommandName=%2Flayout%2Fedit_layout&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_redirect=%2Fweb%2Fguest%2Fcpa1%3Fp_l_mode%3Dedit%26p_l_back_url%3D%252Fgroup%252Fguest%252F%7E%252Fcontrol_panel%252Fmanage%253Fp_p_id%253Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%2526p_p_lifecycle%253D0%2526p_p_state%253Dmaximized%2526p_v_l_s_g_id%253D20119%2526p_p_auth%253DDHDngvfP%26p_p_state%3Dnormal&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_backURL=%2Fweb%2Fguest%2Fcpa1%3Fp_l_mode%3Dedit%26p_l_back_url%3D%252Fgroup%252Fguest%252F%7E%252Fcontrol_panel%252Fmanage%253Fp_p_id%253Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%2526p_p_lifecycle%253D0%2526p_p_state%253Dmaximized%2526p_v_l_s_g_id%253D20119%2526p_p_auth%253DDHDngvfP%26p_p_state%3Dnormal&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_groupId=20119&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_selPlid=17&_com_liferay_layout_admin_web_portlet_GroupPagesPortlet_privateLayout=false&p_p_auth=DHDngvfP',
    redirectURL:
      '/group/guest/~/control_panel/manage?p_p_id=com_liferay_layout_admin_web_portlet_GroupPagesPortlet&p_p_lifecycle=0&p_p_state=maximized&p_v_l_s_g_id=20119&p_p_auth=DHDngvfP',
    editFragmentEntryLinkURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fedit_fragment_entry_link&p_l_mode=edit',
    hasUpdateContentPermissions: true,
    updateSegmentsExperiencePriorityURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fupdate_segments_experience_priority&p_l_mode=edit',
    availableSegmentsEntries: {
      '0': {
        segmentsEntryId: '0',
        name: 'Anyone',
      },
    },
    sidebarPanels: [
      {
        sidebarPanelId: 'elements',
        icon: 'cards2',
        label: 'Fragments',
      },
      {
        sidebarPanelId: 'widgets',
        icon: 'square-hole',
        label: 'Widgets',
      },
      {
        sidebarPanelId: 'separator',
      },
      {
        sidebarPanelId: 'contents',
        icon: 'list-ul',
        label: 'Contents',
      },
      {
        sidebarPanelId: 'page-structure',
        icon: 'pages-tree',
        label: 'Page Structure',
      },
      {
        sidebarPanelId: 'separator',
      },
      {
        sidebarPanelId: 'lookAndFeel',
        icon: 'format',
        label: 'Look and Feel',
      },
      {
        sidebarPanelId: 'separator',
      },
      {
        sidebarPanelId: 'comments',
        icon: 'comments',
        label: 'Comments',
      },
    ],
    renderFragmentEntryURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Frender_fragment_entry&p_l_mode=edit',
    classNameId: '20010',
    defaultSegmentsExperienceId: '0',
    widgets: [
      {
        path: 'root--category-highlighted',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet',
            used: false,
            title: 'Asset Publisher',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_document_library_web_portlet_DLPortlet',
            used: false,
            title: 'Documents and Media',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet',
            used: false,
            title: 'Navigation Menu',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_journal_content_web_portlet_JournalContentPortlet',
            used: false,
            title: 'Web Content Display',
          },
        ],
        title: 'Highlighted',
      },
      {
        path: 'root--category-collaboration',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId: 'com_liferay_blogs_web_portlet_BlogsPortlet',
            used: false,
            title: 'Blogs',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_blogs_web_portlet_BlogsAgreggatorPortlet',
            used: false,
            title: 'Blogs Aggregator',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_calendar_web_portlet_CalendarPortlet',
            used: false,
            title: 'Calendar',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_dynamic_data_lists_web_portlet_DDLDisplayPortlet',
            used: false,
            title: 'Dynamic Data Lists Display',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_dynamic_data_mapping_form_web_portlet_DDMFormPortlet',
            used: false,
            title: 'Form',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_invitation_invite_members_web_portlet_InviteMembersPortlet',
            used: false,
            title: 'Invite Members',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_message_boards_web_portlet_MBPortlet',
            used: false,
            title: 'Message Boards',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_microblogs_web_portlet_MicroblogsPortlet',
            used: false,
            title: 'Microblogs',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_microblogs_web_portlet_MicroblogsStatusUpdatePortlet',
            used: false,
            title: 'Microblogs Status Update',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_mysubscriptions_web_portlet_MySubscriptionsPortlet',
            used: false,
            title: 'My Subscriptions',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_blogs_recent_bloggers_web_portlet_RecentBloggersPortlet',
            used: false,
            title: 'Recent Bloggers',
          },
          {
            instanceable: false,
            portletId: '1_WAR_tasksportlet',
            used: false,
            title: 'Tasks',
          },
          {
            instanceable: false,
            portletId: '2_WAR_tasksportlet',
            used: false,
            title: 'Upcoming Tasks',
          },
        ],
        title: 'Collaboration',
      },
      {
        path: 'root--category-community',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId: 'com_liferay_bookmarks_web_portlet_BookmarksPortlet',
            used: false,
            title: 'Bookmarks',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_directory_web_portlet_FriendsDirectoryPortlet',
            used: false,
            title: 'Friends Directory',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_site_my_sites_web_portlet_MySitesPortlet',
            used: false,
            title: 'My Sites',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_directory_web_portlet_MySitesDirectoryPortlet',
            used: false,
            title: 'My Sites Directory',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_comment_page_comments_web_portlet_PageCommentsPortlet',
            used: false,
            title: 'Page Comments',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_flags_web_portlet_PageFlagsPortlet',
            used: false,
            title: 'Page Flags',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_ratings_page_ratings_web_portlet_PageRatingsPortlet',
            used: false,
            title: 'Page Ratings',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_directory_web_portlet_DirectoryPortlet',
            used: false,
            title: 'Portal Directory',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_directory_web_portlet_SiteMembersDirectoryPortlet',
            used: false,
            title: 'Site Members Directory',
          },
        ],
        title: 'Community',
      },
      {
        path: 'root--category-cms',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet',
            used: false,
            title: 'Asset Publisher',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_site_navigation_breadcrumb_web_portlet_SiteNavigationBreadcrumbPortlet',
            used: false,
            title: 'Breadcrumb',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_categories_navigation_web_portlet_AssetCategoriesNavigationPortlet',
            used: false,
            title: 'Categories Navigation',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_document_library_web_portlet_DLPortlet',
            used: false,
            title: 'Documents and Media',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_flash_web_portlet_FlashPortlet',
            used: false,
            title: 'Flash',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_publisher_web_portlet_HighestRatedAssetsPortlet',
            used: false,
            title: 'Highest Rated Assets',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_knowledge_base_web_portlet_ArticlePortlet',
            used: false,
            title: 'Knowledge Base Article',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_knowledge_base_web_portlet_DisplayPortlet',
            used: false,
            title: 'Knowledge Base Display',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_knowledge_base_web_portlet_SearchPortlet',
            used: false,
            title: 'Knowledge Base Search',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_knowledge_base_web_portlet_SectionPortlet',
            used: false,
            title: 'Knowledge Base Section',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_document_library_web_portlet_IGDisplayPortlet',
            used: false,
            title: 'Media Gallery',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_publisher_web_portlet_MostViewedAssetsPortlet',
            used: false,
            title: 'Most Viewed Assets',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet',
            used: false,
            title: 'Navigation Menu',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_polls_web_portlet_PollsDisplayPortlet',
            used: false,
            title: 'Polls Display',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_recent_documents_web_portlet_RecentDocumentsPortlet',
            used: false,
            title: 'Recent Downloads',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_publisher_web_portlet_RelatedAssetsPortlet',
            used: false,
            title: 'Related Assets',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_site_navigation_site_map_web_portlet_SiteNavigationSiteMapPortlet',
            used: false,
            title: 'Site Map',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_site_navigation_directory_web_portlet_SitesDirectoryPortlet',
            used: false,
            title: 'Sites Directory',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_tags_navigation_web_portlet_AssetTagsCloudPortlet',
            used: false,
            title: 'Tag Cloud',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_asset_tags_navigation_web_portlet_AssetTagsNavigationPortlet',
            used: false,
            title: 'Tags Navigation',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_journal_content_web_portlet_JournalContentPortlet',
            used: false,
            title: 'Web Content Display',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_journal_content_search_web_portlet_JournalContentSearchPortlet',
            used: false,
            title: 'Web Content Search',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_wysiwyg_web_portlet_WYSIWYGPortlet',
            used: false,
            title: 'WYSIWYG',
          },
        ],
        title: 'Content Management',
      },
      {
        path: 'root--category-entertainment',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId: 'com_liferay_youtube_web_portlet_YouTubePortlet',
            used: false,
            title: 'YouTube',
          },
        ],
        title: 'Entertainment',
      },
      {
        path: 'root--category-finance',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId:
              'com_liferay_currency_converter_web_portlet_CurrencyConverterPortlet',
            used: false,
            title: 'Currency Converter',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_loan_calculator_portlet_LoanCalculatorPortlet',
            used: false,
            title: 'Loan Calculator',
          },
        ],
        title: 'Finance',
      },
      {
        path: 'root--category-gadgets',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId: '3_WAR_opensocialportlet',
            used: false,
            title: 'OpenSocial Gadget',
          },
        ],
        title: 'Gadgets',
      },
      {
        path: 'root--category-google',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId: 'com_liferay_google_maps_web_portlet_GoogleMapsPortlet',
            used: false,
            title: 'Google Maps',
          },
        ],
        title: 'Google',
      },
      {
        path: 'root--category-news',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId: 'com_liferay_announcements_web_portlet_AlertsPortlet',
            used: false,
            title: 'Alerts',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_announcements_web_portlet_AnnouncementsPortlet',
            used: false,
            title: 'Announcements',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_asset_publisher_web_portlet_RecentContentPortlet',
            used: false,
            title: 'Recent Content',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_rss_web_portlet_RSSPortlet',
            used: false,
            title: 'RSS Publisher',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_weather_web_portlet_WeatherPortlet',
            used: false,
            title: 'Weather',
          },
        ],
        title: 'News',
      },
      {
        path: 'root--category-sample',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId:
              'com_liferay_chart_sample_web_portlet_ChartSamplePortlet',
            used: false,
            title: 'Chart Sample',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_clay_sample_web_portlet_ClaySamplePortlet',
            used: false,
            title: 'Clay Sample',
          },
          {
            instanceable: false,
            portletId: 'hello_soy_portlet',
            used: false,
            title: 'Hello Soy Portlet',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_hello_velocity_web_portlet_HelloVelocityPortlet',
            used: false,
            title: 'Hello Velocity',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_hello_world_web_portlet_HelloWorldPortlet',
            used: false,
            title: 'Hello World',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_iframe_web_portlet_IFramePortlet',
            used: false,
            title: 'IFrame',
          },
        ],
        title: 'Sample',
      },
      {
        path: 'root--category-search',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_category_facet_portlet_CategoryFacetPortlet',
            used: false,
            title: 'Category Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_custom_facet_portlet_CustomFacetPortlet',
            used: false,
            title: 'Custom Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_internal_custom_filter_portlet_CustomFilterPortlet',
            used: false,
            title: 'Custom Filter',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_folder_facet_portlet_FolderFacetPortlet',
            used: false,
            title: 'Folder Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_low_level_search_options_portlet_LowLevelSearchOptionsPortlet',
            used: false,
            title: 'Low Level Search Options',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_modified_facet_portlet_ModifiedFacetPortlet',
            used: false,
            title: 'Modified Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_search_bar_portlet_SearchBarPortlet',
            used: false,
            title: 'Search Bar',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_search_insights_portlet_SearchInsightsPortlet',
            used: false,
            title: 'Search Insights',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_search_options_portlet_SearchOptionsPortlet',
            used: false,
            title: 'Search Options',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_search_results_portlet_SearchResultsPortlet',
            used: false,
            title: 'Search Results',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_site_facet_portlet_SiteFacetPortlet',
            used: false,
            title: 'Site Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_internal_sort_portlet_SortPortlet',
            used: false,
            title: 'Sort',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_suggestions_portlet_SuggestionsPortlet',
            used: false,
            title: 'Suggestions',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_tag_facet_portlet_TagFacetPortlet',
            used: false,
            title: 'Tag Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_type_facet_portlet_TypeFacetPortlet',
            used: false,
            title: 'Type Facet',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_portal_search_web_user_facet_portlet_UserFacetPortlet',
            used: false,
            title: 'User Facet',
          },
        ],
        title: 'Search',
      },
      {
        path: 'root--category-shopping',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId:
              'com_liferay_amazon_rankings_web_portlet_AmazonRankingsPortlet',
            used: false,
            title: 'Amazon Rankings',
          },
        ],
        title: 'Shopping',
      },
      {
        path: 'root--category-social',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId:
              'com_liferay_social_activities_web_portlet_SocialActivitiesPortlet',
            used: false,
            title: 'Activities',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_contacts_web_portlet_ContactsCenterPortlet',
            used: false,
            title: 'Contacts Center',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_social_group_statistics_web_portlet_SocialGroupStatisticsPortlet',
            used: false,
            title: 'Group Statistics',
          },
          {
            instanceable: false,
            portletId: '1_WAR_powwowportlet',
            used: false,
            title: 'Meetings',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_contacts_web_portlet_MembersPortlet',
            used: false,
            title: 'Members',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_contacts_web_portlet_MyContactsPortlet',
            used: false,
            title: 'My Contacts',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_contacts_web_portlet_ProfilePortlet',
            used: false,
            title: 'Profile',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_social_requests_web_portlet_SocialRequestsPortlet',
            used: false,
            title: 'Requests',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_social_user_statistics_web_portlet_SocialUserStatisticsPortlet',
            used: false,
            title: 'User Statistics',
          },
        ],
        title: 'Social',
      },
      {
        path: 'root--category-tools',
        categories: [],
        portlets: [
          {
            instanceable: false,
            portletId: 'com_liferay_dictionary_web_portlet_DictionaryPortlet',
            used: false,
            title: 'Dictionary',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_site_navigation_language_web_portlet_SiteNavigationLanguagePortlet',
            used: false,
            title: 'Language Selector',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_network_utilities_web_portlet_NetworkUtilitiesPortlet',
            used: false,
            title: 'Network Utilities',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_password_generator_web_portlet_PasswordGeneratorPortlet',
            used: false,
            title: 'Password Generator',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_quick_note_web_portlet_QuickNotePortlet',
            used: false,
            title: 'Quick Note',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_portal_search_web_portlet_SearchPortlet',
            used: false,
            title: 'Search',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_login_web_portlet_LoginPortlet',
            used: false,
            title: 'Sign In',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_translator_web_portlet_TranslatorPortlet',
            used: false,
            title: 'Translator',
          },
          {
            instanceable: false,
            portletId:
              'com_liferay_unit_converter_web_portlet_UnitConverterPortlet',
            used: false,
            title: 'Unit Converter',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_web_form_web_portlet_WebFormPortlet',
            used: false,
            title: 'Web Form',
          },
        ],
        title: 'Tools',
      },
      {
        path: 'root--category-wiki',
        categories: [],
        portlets: [
          {
            instanceable: true,
            portletId:
              'com_liferay_wiki_navigation_web_portlet_WikiNavigationPageMenuPortlet',
            used: false,
            title: 'Page Menu',
          },
          {
            instanceable: true,
            portletId:
              'com_liferay_wiki_navigation_web_portlet_WikiNavigationTreeMenuPortlet',
            used: false,
            title: 'Tree Menu',
          },
          {
            instanceable: false,
            portletId: 'com_liferay_wiki_web_portlet_WikiPortlet',
            used: false,
            title: 'Wiki',
          },
          {
            instanceable: true,
            portletId: 'com_liferay_wiki_web_portlet_WikiDisplayPortlet',
            used: false,
            title: 'Wiki Display',
          },
        ],
        title: 'Wiki',
      },
    ],
    imageSelectorURL:
      '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadFileEntryItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_selectImage&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
    addFragmentEntryLinkURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fadd_fragment_entry_link_react&p_l_mode=edit',
    publishURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fpublish_layout&p_l_mode=edit',
    discardDraftURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fdiscard_draft_layout&p_l_mode=edit',
    updateSegmentsExperienceURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fupdate_segments_experience&p_l_mode=edit',
    classPK: '48',
    getAvailableTemplatesURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=%2Fcontent_layout%2Fget_available_templates&p_p_cacheability=cacheLevelPage',
    updateLayoutPageTemplateDataURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fupdate_layout_page_template_data&p_l_mode=edit',
    fragments: [
      {
        fragmentEntries: [
          {
            groupId: '0',
            name: 'Button',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-button',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/button.png',
          },
          {
            groupId: '0',
            name: 'Card',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-card',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/card.png',
          },
          {
            groupId: '0',
            name: 'Heading',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-heading',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/heading.png',
          },
          {
            groupId: '0',
            name: 'HTML',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-html',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/html.png',
          },
          {
            groupId: '0',
            name: 'Image',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-image',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/image.png',
          },
          {
            groupId: '0',
            name: 'Paragraph',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-paragraph',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/paragraph.png',
          },
          {
            groupId: '0',
            name: 'Separator',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-separator',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/separator.png',
          },
          {
            groupId: '0',
            name: 'Slider',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-slider',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/slider.png',
          },
          {
            groupId: '0',
            name: 'Social',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-social',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/social.png',
          },
          {
            groupId: '0',
            name: 'Spacer',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-spacer',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/spacer.png',
          },
          {
            groupId: '0',
            name: 'Video',
            type: 1,
            fragmentEntryKey: 'BASIC_COMPONENT-video',
            imagePreviewURL:
              '/o/fragment-collection-contributor-basic-component/thumbnails/video.png',
          },
        ],
        fragmentCollectionId: 'BASIC_COMPONENT',
        name: 'Basic Components',
      },
      {
        fragmentEntries: [
          {
            groupId: '0',
            name: 'Banner Center',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-banner-center',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/banner_center.png',
          },
          {
            groupId: '0',
            name: 'Banner Cover Center',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-banner-cover-center',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/banner_cover_center.png',
          },
          {
            groupId: '0',
            name: 'Banner Cover',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-banner-cover',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/banner_cover.png',
          },
          {
            groupId: '0',
            name: 'Banner Slider',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-banner-slider',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/banner_slider.png',
          },
          {
            groupId: '0',
            name: 'Banner',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-banner',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/banner.png',
          },
          {
            groupId: '0',
            name: 'Features',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-features',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/features.png',
          },
          {
            groupId: '0',
            name: 'Highlights Center',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-highlights-circle',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/highlights_circle.png',
          },
          {
            groupId: '0',
            name: 'Highlights',
            type: 0,
            fragmentEntryKey: 'FEATURED_CONTENT-highlights',
            imagePreviewURL:
              '/o/fragment-collection-contributor-featured-content/thumbnails/highlights.png',
          },
        ],
        fragmentCollectionId: 'FEATURED_CONTENT',
        name: 'Featured Content',
      },
      {
        fragmentEntries: [
          {
            groupId: '0',
            name: 'Footer Nav Dark',
            type: 0,
            fragmentEntryKey: 'FOOTERS-footer-nav-dark',
            imagePreviewURL:
              '/o/fragment-collection-contributor-footers/thumbnails/footer_nav_dark.png',
          },
          {
            groupId: '0',
            name: 'Footer Nav Light',
            type: 0,
            fragmentEntryKey: 'FOOTERS-footer-nav-light',
            imagePreviewURL:
              '/o/fragment-collection-contributor-footers/thumbnails/footer_nav_light.png',
          },
        ],
        fragmentCollectionId: 'FOOTERS',
        name: 'Footers',
      },
      {
        fragmentEntries: [
          {
            groupId: '0',
            name: 'Header Dark',
            type: 0,
            fragmentEntryKey: 'NAVIGATION_BARS-header-dark',
            imagePreviewURL:
              '/o/fragment-collection-contributor-navigation-bars/thumbnails/header_dark.png',
          },
          {
            groupId: '0',
            name: 'Header Light',
            type: 0,
            fragmentEntryKey: 'NAVIGATION_BARS-header-light',
            imagePreviewURL:
              '/o/fragment-collection-contributor-navigation-bars/thumbnails/header_light.png',
          },
        ],
        fragmentCollectionId: 'NAVIGATION_BARS',
        name: 'Navigation Bars',
      },
      {
        fragmentEntries: [
          {
            name: 'Content',
            fragmentEntryKey:
              'com.liferay.fragment.internal.renderer.ContentObjectFragmentRenderer',
            imagePreviewURL: '',
          },
        ],
        fragmentCollectionId: 'content-display',
        name: 'Content Display',
      },
    ],
    deleteItemURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fdelete_item_react&p_l_mode=edit',
    portletNamespace:
      '_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_',
    editFragmentEntryLinkCommentURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fedit_fragment_entry_link_comment&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_cmd=update&p_l_mode=edit',
    discardDraftRedirectURL:
      '/web/guest/cpa1?p_l_mode=edit&p_l_back_url=%2Fgroup%2Fguest%2F~%2Fcontrol_panel%2Fmanage%3Fp_p_id%3Dcom_liferay_layout_admin_web_portlet_GroupPagesPortlet%26p_p_lifecycle%3D0%26p_p_state%3Dmaximized%26p_v_l_s_g_id%3D20119%26p_p_auth%3DDHDngvfP&p_p_state=normal',
    duplicateFragmentEntryLinkURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fduplicate_fragment_entry_link_react&p_l_mode=edit',
    addItemURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fadd_item_react&p_l_mode=edit',
    availableLanguages: {
      sv_SE: {
        languageLabel: 'sv-SE',
        languageIcon: 'sv-se',
      },
      pt_BR: {
        languageLabel: 'pt-BR',
        languageIcon: 'pt-br',
      },
      fr_FR: {
        languageLabel: 'fr-FR',
        languageIcon: 'fr-fr',
      },
      ja_JP: {
        languageLabel: 'ja-JP',
        languageIcon: 'ja-jp',
      },
      ca_ES: {
        languageLabel: 'ca-ES',
        languageIcon: 'ca-es',
      },
      de_DE: {
        languageLabel: 'de-DE',
        languageIcon: 'de-de',
      },
      hu_HU: {
        languageLabel: 'hu-HU',
        languageIcon: 'hu-hu',
      },
      ar_SA: {
        languageLabel: 'ar-SA',
        languageIcon: 'ar-sa',
      },
      fi_FI: {
        languageLabel: 'fi-FI',
        languageIcon: 'fi-fi',
      },
      en_US: {
        languageLabel: 'en-US',
        languageIcon: 'en-us',
      },
      zh_CN: {
        languageLabel: 'zh-CN',
        languageIcon: 'zh-cn',
      },
      es_ES: {
        languageLabel: 'es-ES',
        languageIcon: 'es-es',
      },
      nl_NL: {
        languageLabel: 'nl-NL',
        languageIcon: 'nl-nl',
      },
    },
    deleteFragmentEntryLinkCommentURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fdelete_fragment_entry_link_comment&p_l_mode=edit',
    infoItemSelectorURL:
      '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.InfoItemItemSelectorReturnType%22%2C%22itemSubtype%22%3Anull%2C%22itemType%22%3Anull%2C%22mimeTypes%22%3Anull%2C%22status%22%3A0%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.info.item.criterion.InfoItemItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_selectInfoItem&p_p_auth=XiIHFlaH',
    updateItemConfigURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fupdate_item_config_react&p_l_mode=edit',
    addFragmentEntryLinkCommentURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fadd_fragment_entry_link_comment&p_l_mode=edit',
    defaultLanguageId: 'en_US',
    updateRowColumnsURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fupdate_row_columns_react&p_l_mode=edit',
    themeColorsCssClasses: [
      'primary',
      'success',
      'danger',
      'warning',
      'info',
      'dark',
      'gray-dark',
      'secondary',
      'light',
      'lighter',
      'white',
    ],
    defaultSegmentsEntryId: '0',
    hasEditSegmentsEntryPermission: true,
    addPortletURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fadd_portlet_react&p_l_mode=edit',
    hasUpdatePermissions: true,
    moveItemURL:
      '/web/guest/cpa1/?p_p_id=com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_javax.portlet.action=%2Fcontent_layout%2Fmove_fragment_entry_link_react&p_l_mode=edit',
    defaultEditorConfigurations: {
      'rich-text': {
        editorConfig: {
          spritemap: '/o/classic-theme/images/lexicon/icons.svg',
          filebrowserBrowseUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.file.criterion.FileItemSelectorCriterion%2Ccom.liferay.layout.item.selector.criterion.LayoutItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22checkDisplayPage%22%3Afalse%2C%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22enableCurrentPage%22%3Afalse%2C%22followURLOnTitleClick%22%3Afalse%2C%22multiSelection%22%3Afalse%2C%22showActionsMenu%22%3Afalse%2C%22showHiddenPages%22%3Atrue%2C%22showPrivatePages%22%3Atrue%2C%22showPublicPages%22%3Atrue%7D&p_p_auth=XiIHFlaH',
          enterMode: 2,
          removePlugins:
            'contextmenu,elementspath,floatingspace,image,link,liststyle,magicline,resize,tabletools,toolbar,ae_embed',
          allowedContent:
            'b code em h1 h2 h3 h4 h5 h6 hr i p pre strong u [*](*){*}; a[*](*); div[*](*){text-align}; img[*](*){*}; p[*](*); li ol ul [*](*){*};table[border, cellpadding, cellspacing] {width}; tbody td th[scope]; thead tr[scope]; span[*](*){*}; ',
          extraPlugins:
            'ae_autolink,ae_dragresize,ae_addimages,ae_imagealignment,ae_placeholder,ae_selectionregion,ae_tableresize,ae_tabletools,ae_uicore,itemselector,media,adaptivemedia',
          filebrowserImageBrowseUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadURLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=_EDITOR_NAME_selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
          filebrowserImageBrowseLinkUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadURLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=_EDITOR_NAME_selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
          toolbars: {
            add: {
              buttons: ['image', 'hline'],
              tabIndex: 1,
            },
            styles: {
              selections: [
                {
                  buttons: ['linkEditBrowse'],
                  test: 'AlloyEditor.SelectionTest.link',
                  name: 'link',
                },
                {
                  buttons: [
                    {
                      cfg: {
                        styles: [
                          {
                            name: 'Small',
                            style: {
                              attributes: {
                                class: 'small',
                              },
                              type: 1,
                              element: 'p',
                            },
                          },
                          {
                            name: 'Lead',
                            style: {
                              attributes: {
                                class: 'lead',
                              },
                              type: 1,
                              element: 'p',
                            },
                          },
                          {
                            name: 'Heading 1',
                            style: {
                              type: 1,
                              element: 'h1',
                            },
                          },
                          {
                            name: 'Heading 2',
                            style: {
                              type: 1,
                              element: 'h2',
                            },
                          },
                          {
                            name: 'Heading 3',
                            style: {
                              type: 1,
                              element: 'h3',
                            },
                          },
                          {
                            name: 'Heading 4',
                            style: {
                              type: 1,
                              element: 'h4',
                            },
                          },
                        ],
                      },
                      name: 'styles',
                    },
                    'bold',
                    'italic',
                    'underline',
                    'ol',
                    'ul',
                    'linkBrowse',
                    'paragraphLeft',
                    'paragraphCenter',
                    'paragraphRight',
                    'paragraphJustify',
                    'spacing',
                    'color',
                    'removeFormat',
                  ],
                  test: 'AlloyEditor.SelectionTest.text',
                  name: 'text',
                },
              ],
              tabIndex: 1,
            },
          },
        },
        editorOptions: {
          dynamicAttributes: {},
          textMode: false,
          uploadItemReturnType: null,
          uploadURL: null,
        },
      },
      comment: {
        editorConfig: {
          filebrowserBrowseUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.file.criterion.FileItemSelectorCriterion%2Ccom.liferay.layout.item.selector.criterion.LayoutItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22checkDisplayPage%22%3Afalse%2C%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22enableCurrentPage%22%3Afalse%2C%22followURLOnTitleClick%22%3Afalse%2C%22multiSelection%22%3Afalse%2C%22showActionsMenu%22%3Afalse%2C%22showHiddenPages%22%3Atrue%2C%22showPrivatePages%22%3Atrue%2C%22showPublicPages%22%3Atrue%7D&p_p_auth=XiIHFlaH',
          enterMode: 2,
          removePlugins:
            'contextmenu,elementspath,floatingspace,image,link,liststyle,magicline,resize,tabletools,toolbar,ae_embed',
          allowedContent: '',
          autocomplete: {
            requestTemplate: 'query={query}',
            trigger: [
              {
                resultFilters: 'function(query, results) {return results;}',
                resultTextLocator: 'screenName',
                tplReplace: '{mention}',
                term: '@',
                source:
                  '/web/guest/cpa1/?p_p_id=com_liferay_mentions_web_portlet_MentionsPortlet&p_p_lifecycle=2&p_p_cacheability=cacheLevelPage&_com_liferay_mentions_web_portlet_MentionsPortlet_strategy=%7B%22plid%22%3A17%2C%22strategy%22%3A%22pageEditorCommentStrategy%22%7D&p_p_auth=QSMlr43z&_com_liferay_mentions_web_portlet_MentionsPortlet_',
                tplResults:
                  '<div class="p-1 autofit-row autofit-row-center"><div class="autofit-col inline-item-before">{portraitHTML}</div><div class="autofit-col autofit-col-expand"><strong class="text-truncate">{fullName}</strong><div class="autofit-col-expand"><small class="text-truncate">@{screenName}</small></div></div></div>',
                regExp:
                  '(?:\\strigger|^trigger)((?:\\w|[\\-._])(?:\\w|\\d|[\\-._])*)',
              },
            ],
          },
          extraPlugins:
            'ae_autolink,ae_dragresize,ae_addimages,ae_imagealignment,ae_placeholder,ae_selectionregion,ae_tableresize,ae_tabletools,ae_uicore,itemselector,media,adaptivemedia,autocomplete',
          filebrowserImageBrowseUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadURLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
          disallowedContent: 'br',
          filebrowserImageBrowseLinkUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadURLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
          toolbars: {},
        },
        editorOptions: {
          dynamicAttributes: {},
          textMode: false,
          uploadItemReturnType: null,
          uploadURL: null,
        },
      },
      text: {
        editorConfig: {
          filebrowserBrowseUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.file.criterion.FileItemSelectorCriterion%2Ccom.liferay.layout.item.selector.criterion.LayoutItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22checkDisplayPage%22%3Afalse%2C%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%2C%22enableCurrentPage%22%3Afalse%2C%22followURLOnTitleClick%22%3Afalse%2C%22multiSelection%22%3Afalse%2C%22showActionsMenu%22%3Afalse%2C%22showHiddenPages%22%3Atrue%2C%22showPrivatePages%22%3Atrue%2C%22showPublicPages%22%3Atrue%7D&p_p_auth=XiIHFlaH',
          enterMode: 2,
          removePlugins:
            'contextmenu,elementspath,floatingspace,image,link,liststyle,magicline,resize,tabletools,toolbar,ae_embed',
          allowedContent: '',
          extraPlugins:
            'ae_autolink,ae_dragresize,ae_addimages,ae_imagealignment,ae_placeholder,ae_selectionregion,ae_tableresize,ae_tabletools,ae_uicore,itemselector,media,adaptivemedia',
          filebrowserImageBrowseUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadURLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
          disallowedContent: 'br',
          filebrowserImageBrowseLinkUrl:
            '/group/guest/~/control_panel/manage?p_p_id=com_liferay_item_selector_web_portlet_ItemSelectorPortlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_0_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.DownloadURLItemSelectorReturnType%22%7D&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_criteria=com.liferay.item.selector.criteria.image.criterion.ImageItemSelectorCriterion%2Ccom.liferay.item.selector.criteria.url.criterion.URLItemSelectorCriterion&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_itemSelectedEventName=selectItem&_com_liferay_item_selector_web_portlet_ItemSelectorPortlet_1_json=%7B%22desiredItemSelectorReturnTypes%22%3A%22com.liferay.item.selector.criteria.URLItemSelectorReturnType%22%7D&p_p_auth=XiIHFlaH',
          toolbars: {},
        },
        editorOptions: {
          dynamicAttributes: {},
          textMode: false,
          uploadItemReturnType: null,
          uploadURL: null,
        },
      },
    },
  },
  portletNamespace:
    'com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet',
};
