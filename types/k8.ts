type Primitive = string | number | boolean | null | undefined;

export type NestedKeyOf<ObjectType = object> = {
  [Key in keyof ObjectType &
    (string | number)]: ObjectType[Key] extends Primitive
    ? Key
    : ObjectType[Key] extends Array<any>
    ? Key
    : ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : never;
}[keyof ObjectType & (string | number)];

export type Container = {
  name?: string;
  image?: string;
  status?: {
    restartCount?: number;
    ready?: boolean;
  }[];
  ports?: {
    name?: string;
    hostPort?: number;
    containerPort?: number;
    protocol?: string;
  }[];
  environment?: {
    name?: string;
    value?: string;
  }[];
  mounts?: {
    name?: string;
    mountPath?: string;
    readOnly?: boolean;
  }[];
  liveness?: {
    initialDelaySeconds?: number;
    periodSeconds?: number;
    timeoutSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
  };
  volumes?: string[];
};

export type Event = {
  name?: string;
  message?: string;
  reason?: string;
  type?: string;
};

export type Metric = {
  timestamp?: string;
  value: {
    cpu?: number;
    memory?: number;
  }[];
};

export type Toleration = {
  key?: string;
  operator?: string;
  effect?: string;
};

export type KubernetesResource = {
  apiVersion: string;
  kind: string;
  name: string;
  namespace?: string;
  node?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  age?: string;
  created: string;
  events?: Event[];
  metric?: Metric[];
};

export type ResourceType =
  // overview
  | 'overview'
  // nodes
  | 'node'
  // workloads
  | 'pod'
  | 'deployment'
  | 'daemonset'
  | 'statefulset'
  | 'replicaset'
  | 'job'
  | 'cronjob'
  | 'replicationcontroller'
  // config
  | 'configmap'
  | 'poddisruptionbudget'
  | 'secret'
  // storage
  | 'persistentvolume'
  | 'persistentvolumeclaim'
  | 'storageclass'
  // network
  | 'endpoint'
  | 'ingress'
  | 'ingressclass'
  | 'networkpolicy'
  | 'service'
  // namespace
  | 'namespace'
  // events
  | 'event'
  // access control
  | 'clusterrole'
  | 'clusterrolebinding'
  | 'role'
  | 'rolebinding'
  | 'serviceaccount'
  // custom resources (CRDs)
  | 'customresourcedefinition';

export type ClusterRole = KubernetesResource & {
  rules?: {
    apiGroups?: string[];
    resources?: string[];
    verbs?: string[];
  }[];
};

export type ClusterRoleBinding = KubernetesResource & {
  roleRef?: {
    apiGroup?: string;
    kind?: string;
    name?: string;
  };
  subjects?: {
    kind?: string;
    name?: string;
    namespace?: string;
  }[];
};

export type ConfigMap = KubernetesResource & {
  data?: Record<string, string>;
  binaryData?: Record<string, string>;
};

export type CronJob = KubernetesResource & {
  schedule?: string;
  suspend?: boolean;
  active?: string[];
};

export type DaemonSet = KubernetesResource & {
  images?: string[];
  strategyType?: string;
  tolerations?: Toleration[];
  running?: number;
  desired?: number;
  current?: number;
  ready?: number;
  available?: number;
  upToDate?: number;
  pods?: Pod[];
};

export type ReplicaStatus = {
  desired?: number;
  current?: number;
  ready?: number;
  available?: number;
  unavailable?: number;
};

export type Deployment = KubernetesResource & {
  strategyType?: string;
  replicas?: ReplicaStatus;
  available?: number;
  ready?: number;
  updated?: number;
  unavailable?: number;
  progressDeadline?: string;
  minReadySeconds?: string;
  rollingUpdate?: {
    maxSurge?: string;
    maxUnavailable?: string;
  };
  revisionHistoryLimit?: number;
  paused?: boolean;
  rollingBack?: boolean;
  pods?: Pod[];
};

export type Ingress = KubernetesResource & {
  rules?: {
    host?: string;
    path?: string;
    backend?: {
      serviceName?: string;
      servicePort?: number;
    };
  }[];
};

export type IngressClass = KubernetesResource & {
  controller?: string;
};

export type Job = KubernetesResource & {
  completions?: number;
  parallelism?: number;
  active?: number;
  succeeded?: number;
  failed?: number;
  backoffLimit?: number;
  ttlSecondsAfterFinished?: number;
  pods?: Pod[];
};

export type Node = KubernetesResource & {
  version?: string;
  role?: string[];
  status?: string;
};

export type Namespace = KubernetesResource & {
  status?: string;
};

export type NetworkPolicy = KubernetesResource & {
  podSelector?: {
    matchLabels?: Record<string, string>;
  };
  policyTypes?: string[];
  ingress?: {
    from?: {
      podSelector?: {
        matchLabels?: Record<string, string>;
      };
      namespaceSelector?: {
        matchLabels?: Record<string, string>;
      };
      ipBlock?: {
        cidr?: string;
        except?: string[];
      };
    }[];
    ports?: {
      protocol?: string;
      port?: string;
    }[];
  }[];
  egress?: {
    to?: {
      podSelector?: {
        matchLabels?: Record<string, string>;
      };
      namespaceSelector?: {
        matchLabels?: Record<string, string>;
      };
      ipBlock?: {
        cidr?: string;
        except?: string[];
      };
    }[];
    ports?: {
      protocol?: string;
      port?: string;
    }[];
  }[];
};

export type PersistentVolume = KubernetesResource & {
  capacity?: Record<string, string>;
  accessModes?: string[];
  reclaimPolicy?: string;
  storageClass?: string;
  status?: string;
  claim?: string;
};

export type PersistentVolumeClaim = KubernetesResource & {
  accessModes?: string[];
  storageClass?: string;
  volumeName?: string;
  capacity?: Record<string, string>;
  status?: string;
};

export type Pod = KubernetesResource & {
  status?: string;
  controlledBy?: {
    apiVersion?: string;
    kind?: string;
    name?: string;
  }[];
  podIP?: string;
  podIPs?: string[];
  serviceAccountName?: string;
  conditions?: {
    type?: string;
  }[];
  qosClass?: string;
  tolerations?: Toleration[];
  containers?: Container[];
  restarts?: number;
  age?: string;
  cpu?: string;
  memory?: string;
  created?: string;
};

export type PodDisruptionBudget = KubernetesResource & {
  minAvailable?: number | string;
  maxUnavailable?: number | string;
  selector?: {
    matchLabels?: Record<string, string>;
  };
  status?: {
    currentHealthy?: number;
    desiredHealthy?: number;
    disruptionsAllowed?: number;
    expectedPods?: number;
  };
};

export type ReplicaSet = KubernetesResource & {
  desired?: number;
  current?: number;
  ready?: number;
  available?: number;
  pods?: Pod[];
};

export type ReplicationController = KubernetesResource & {
  desired?: number;
  current?: number;
  ready?: number;
  available?: number;
  pods?: Pod[];
};

export type Role = KubernetesResource & {
  rules?: {
    apiGroups?: string[];
    resources?: string[];
    verbs?: string[];
  }[];
};

export type RoleBinding = KubernetesResource & {
  roleRef?: {
    apiGroup?: string;
    kind?: string;
    name?: string;
  };
  subjects?: {
    kind?: string;
    name?: string;
    namespace?: string;
  }[];
};

export type Secret = KubernetesResource & {
  type?: string;
  data?: Record<string, string>;
};

export type Service = KubernetesResource & {
  clusterIP?: string;
  externalIPs?: string[];
  externalName?: string;
  externalTrafficPolicy?: string;
  healthCheckNodePort?: number;
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: string[];
  ports?: {
    name?: string;
    protocol?: string;
    port?: number;
    targetPort?: number;
    nodePort?: number;
  }[];
  selector?: Record<string, string>;
  sessionAffinity?: string;
  type?: string;
  externalEndpoints?: string[];
};

export type ServiceAccount = KubernetesResource & {
  secrets?: {
    name?: string;
  }[];
};

export type StatefulSet = KubernetesResource & {
  replicas?: ReplicaStatus;
  ready?: number;
  current?: number;
  updated?: number;
  available?: number;
  pods?: Pod[];
};

export type StorageClass = KubernetesResource & {
  provisioner?: string;
  reclaimPolicy?: string;
  volumeBindingMode?: string;
  allowVolumeExpansion?: boolean;
  age?: string;
};

export type Volume = KubernetesResource & {
  capacity?: string;
  accessModes?: string[];
  reclaimPolicy?: string;
  storageClass?: string;
  status?: string;
  claim?: string;
};

export type CustomResourceDefinition = KubernetesResource & {
  group?: string;
  versions?: {
    name: string;
    served: boolean;
    storage: boolean;
  }[];
  scope?: string;
  names?: {
    plural: string;
    singular: string;
    kind: string;
    shortNames?: string[];
  };
};

export type Endpoint = KubernetesResource & {
  subsets?: {
    addresses?: {
      ip?: string;
      hostname?: string;
      nodeName?: string;
      targetRef?: {
        kind?: string;
        namespace?: string;
        name?: string;
        uid?: string;
      };
    }[];
    ports?: {
      name?: string;
      port?: number;
      protocol?: string;
    }[];
  }[];
};

export type WorkloadStatus = {
  running: number;
  pending: number;
  failed: number;
  available: number;
  progressing: number;
  complete: number;
  active: number;
  unknown: number;
};
export type WorkloadsOverview = {
  pods: WorkloadStatus;
  deployments: WorkloadStatus;
  daemonSets: WorkloadStatus;
  statefulSets: WorkloadStatus;
  replicaSets: WorkloadStatus;
  jobs: WorkloadStatus;
  cronJobs: WorkloadStatus;
  namespaces: number;
};
