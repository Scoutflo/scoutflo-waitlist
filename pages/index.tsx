import { useToast } from 'components/ui/use-toast';
import FormWrapper from 'components/ui/abstraction/FormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/router';
import DeployLogo from 'public/brand/deploy.png';
import DeployDarkLogo from 'public/brand/logo-dark.png';
import axios from 'axios';
import { DefaultSeo } from 'next-seo';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import Icon from 'components/ui/icon';
import styles from '../styles/waitlist.module.scss';

export const WAITING_LIST_INPUTS = [
  {
    id: 'name',
    label: 'Full name',
    type: 'text',
    placeholder: 'John Doe',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'example@scoutflo.com',
  },
];

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, { message: `Name can't be empty` }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' })
    .min(1, { message: `Email can't be empty` }),
});

const CAROUSEL_ITEMS = [
  {
    key: 1,
    icon: 'scan-eye',
    color: '#E0CA3C',
    description: 'Provision and maintain Infrastructure with IaC',
  },
  {
    key: 2,
    icon: 'git-branch',
    color: '#0090C1',
    description: 'Securely deploy applications on your cloud with your git',
  },
  {
    key: 3,
    icon: 'package-check',
    color: '#D45113',
    description: 'Deploy over 100+ production ready open-source applications',
  },
  {
    key: 4,
    icon: 'scan-eye',
    color: '#E0CA3C',
    description: 'Provision and maintain Infrastructure with IaC',
  },
  {
    key: 5,
    icon: 'git-branch',
    color: '#0090C1',
    description: 'Securely deploy applications on your cloud with your git',
  },
  {
    key: 6,
    icon: 'package-check',
    color: '#D45113',
    description: 'Deploy over 100+ production ready open-source applications',
  },
  {
    key: 7,
    icon: 'scan-eye',
    color: '#E0CA3C',
    description: 'Provision and maintain Infrastructure with IaC',
  },
  {
    key: 8,
    icon: 'git-branch',
    color: '#0090C1',
    description: 'Securely deploy applications on your cloud with your git',
  },
  {
    key: 9,
    icon: 'package-check',
    color: '#D45113',
    description: 'Deploy over 100+ production ready open-source applications',
  },
];

const WaitingList = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const { basePath } = useRouter();
  const { toast } = useToast();
  const imageUrlPrefix = `${
    process.env.NODE_ENV === 'production' ? basePath : ''
  }`;

  const postData = async (url: string, data: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast({
        title: 'Added to waitlist!',
      });
    } catch (error) {
      console.error('Error posting data:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! User could not be saved.',
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      list_type: 'deploy-argo',
    };
    postData(`${process.env.NEXT_PUBLIC_ATLAS_BACKEND}/waitlist`, data);
    form.reset();
  }

  return (
    <>
      <DefaultSeo
        title="Scoutflo: Manage production-ready Open-source apps on Kubernetes"
        description="Scoutflo is an automated GitOps platform that makes it easy to deploy and manage production-ready Open-source apps on Kubernetes."
        canonical="https://deploy.scoutflo.com/waitlist"
        openGraph={{
          title:
            'Scoutflo: Manage production-ready Open-source apps on Kubernetes',
          description:
            'Scoutflo is an automated GitOps platform that makes it easy to deploy and manage production-ready Open-source apps on Kubernetes.',
          images: [
            {
              url: 'https://files1-prod.sgp1.cdn.digitaloceanspaces.com/coming-soon-3.png',
              width: 800,
              height: 600,
              alt: 'Scoutflo Deploy',
            },
          ],
        }}
        twitter={{
          handle: '@scout_flo',
          cardType: 'summary_large_image',
        }}
      />
      <div className="relative h-screen flex-col items-center justify-center md:grid xl:max-w-none xl:grid-cols-2 xl:px-0">
        {/* Illustration */}
        <div className="relative hidden h-full flex-col text-white xl:flex xl:items-center xl:justify-center dark:border-r overflow-hidden max-w-[1000px] primary-gradient">
          <img
            src={`${imageUrlPrefix}${DeployLogo.src}`}
            width={280}
            height={28.56}
            alt="Scoutflo Deploy"
            className="md:absolute md:top-6 md:left-6"
          />
          <div className="flex flex-col h-full w-full justify-between">
            <img
              src={`${imageUrlPrefix}/brand/DeployIllustration.png
          `}
              width={500}
              height={400.78}
              alt="Scoutflo Deploy steps"
              className="relative z-20 m-auto"
            />
            <div className={styles.carousel}>
              {CAROUSEL_ITEMS?.map((item) => (
                <Card className={styles.carousel_item} key={item?.key}>
                  <CardHeader>
                    <CardTitle>
                      <Icon name={item?.icon} color={item?.color} />
                    </CardTitle>
                    <CardDescription className="text-white">
                      {item?.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          {/* testimonial */}
          {/* <div className="flex m-auto space-x-4">
            <Avatar>
              <AvatarImage
                src="https://files1-prod.sgp1.cdn.digitaloceanspaces.com/WaitlistTestimony%20(1).jpeg"
                alt="MB"
              />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                Mohit Bhandari - CEO @Stratzy
              </h4>
              <blockquote className="text-sm pl-2 w-[360px] text-white">
                Scoutflo helped us easily migrate to open source and Kubernetes.
                Our processes got much more streamlined once we started using
                GitOps and IaC for deployment.
              </blockquote>
            </div>
          </div> */}
        </div>
        {/* Waiting list form */}
        <div className="h-full p-4 xl:p-8">
          <div className="m-auto h-full flex w-full xl:max-w-[420px] flex-col justify-center space-y-6">
            <img
              src={`${imageUrlPrefix}${DeployDarkLogo.src}`}
              width={280}
              height={28.56}
              alt="Scoutflo Deploy"
              className="mb-16 mx-auto xl:hidden xl:absolute"
            />
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl md:text-3xl xl:text-2xl font-semibold tracking-tight">
                We’re launching soon.
                <br />
                Join the waitlist 💙
              </h1>
              <p className="text-sm md:text-base xl:text-sm text-muted-foreground">
                Get early access when it’s out!
              </p>
            </div>
            <FormWrapper
              form={form}
              onSubmit={onSubmit}
              inputFields={WAITING_LIST_INPUTS}
              buttonAlign="cover"
              isDisabled={!form?.formState.isValid}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingList;
