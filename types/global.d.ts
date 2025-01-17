declare global {
  type EnvKeys = {
    type: string;
    name: string;
    description: string;
    is_required: boolean;
    db_key_type: string;
    is_constant: boolean;
    default_value: string;
    _id: string;
  };

  type StringNumberBooleanRecord = Record<string, string | number | boolean>;

  type FetchError = {
    data: {
      message: string;
    };
  };

  type NestedObject = {
    [key: string]: string | NestedObject | any[];
  };

  type ClusterDetails = {
    id: string;
    value: string;
    clusterId: string;
    hostedZoneName: string;
    isFreeTrial: boolean;
    createdAt: string;
    region: string;
    hostedZone: {
      name: string;
      url: string;
      hosted_zone_id: string;
    };
    deployedApps: any[]; // Replace 'any' with a specific type if known
  };

  type PreDeployConfigurations = {
    namespace: string;
    version: string;
    cluster: ClusterDetails;
    addOns: {
      name: string;
      connection_id: string;
      db_key_types?: Record<string, string>;
    }[];
    customizations: {
      computePlanConfig: string;
      storageAmount: string;
      storageUnit: string;
      replicaCount: string;
      redisEvictionPolicy: string;
      databaseName: string;
    };
    db_selector: 'create' | 'connect';
    network: 'private' | 'public';
    templates?: string;
    overrideValues?: { base: string; updated: string };
    addOnsValues?: NestedObject;
    stepsCompleted: {
      key: number;
      isCompleted: boolean;
    }[];
    appReadMe: string;
    appChartYaml: string;
    appTemplate: NestedObject;
    valuesSchema: NestedObject;
    preDeployAppDataLoading: boolean;
  };

  type PostDeployConfigurations = {
    branch: string;
    filePath: string;
    fileExtentionType: string;
    filesModified: {
      filePath: string;
      code: {
        original: string;
        modified: string;
        lastModified?: string;
      };
    }[];
    selectedCommit: any
    currentFileOriginalContent: string;
  };

  type TableType =
    | 'Cluster'
    | 'Apps'
    | 'AddOns'
    | 'Connections'
    | 'ArgoResource'
    | 'ArgoResourceEvents'
    | 'WorkspaceTeam'
    | 'WorkspaceInvite'
    | 'PrometheusAlerts';

  type ButtonVariant =
    | 'link'
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'support'
    | 'ghost';

  type AppCredsProps = {
    username: string;
    password: string;
  };

  type DeployUser = {
    email: string;
    image: string;
    role: string;
    name: string;
    company_name: string;
    token: string;
    reg_type: string;
    onboarding: boolean;
  };

  type IFrameData = {
    data: {
      src: string;
      height: string;
    };
  };

  type RepoData = {
    name: string;
    issues: number;
    prs: number;
  }[];

  type Repo = {
    code: string;
    message: string;
    error?: string;
    data: RepoData;
    isSeedingRequired: boolean;
  };

  type Metrics = {
    key: string;
    value: {
      name: string;
      deploymentFrequency: number;
      leadTimeForChanges: number;
      changeFailureRate: number;
      timeToRestoreService: number;
    }[];
  };

  type DoraMetrics = {
    code: string;
    message: string;
    error?: string;
    data: {
      orgs?: Metrics[];
      repos?: Metrics[];
    };
  };
}

export {
  AppCredsProps,
  ButtonVariant,
  ClusterDetails,
  DeployUser,
  DoraMetrics,
  EnvKeys,
  FetchError,
  IFrameData,
  Metrics,
  NestedObject,
  PreDeployConfigurations,
  Repo,
  RepoData,
  StringNumberBooleanRecord,
  TableType,
};
