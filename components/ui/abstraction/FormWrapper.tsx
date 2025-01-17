'use client';

import { Button } from '../button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import TooltipOverlay from './TooltipOverlay';
import Icon from '@/ui/icon';
import { Switch } from '../switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { useMeasure } from 'react-use';
import { Label } from '../label';
import { RadioGroup, RadioGroupItem } from '../radio-group';

type InputField = {
  id: string;
  label: string;
  type: string;
  value?: string | number | readonly string[];
  placeholder?: string;
  helpText?: string;
  description?: string;
  disabled?: boolean;
  selectorList?: Record<string, string>[];
  radioSelectList?: { id: string; label: string }[];
};

type ButtonAlign = 'default' | 'left' | 'right' | 'cover';
type ButtonIconAlign = 'left' | 'right';

type FormProps = {
  form: any;
  onSubmit: any;
  inputFields: InputField[];
  parentClass?: string;
  childrenClass?: string;
  buttonVariant?: any;
  buttonIcon?: string;
  buttonIconAlign?: ButtonIconAlign;
  isDisabled?: boolean;
  buttonText?: string;
  variant?: 'default' | 'underline';
  buttonAlign?: ButtonAlign;
  hideButton?: boolean;
  labelColor?: 'white' | 'gray';
};

const IsSwitch = 'switch';

const buttonAlignClass = (buttonAlign?: ButtonAlign): string => {
  switch (buttonAlign) {
    case 'left':
      return 'float-left';
    case 'right':
      return 'float-right';
    case 'cover':
      return 'w-full';
    default:
      return 'float-left';
  }
};

const FormWrapper: React.FC<FormProps> = ({
  form,
  onSubmit,
  inputFields,
  parentClass,
  childrenClass,
  buttonVariant,
  buttonIcon,
  buttonIconAlign,
  isDisabled,
  buttonText,
  variant,
  buttonAlign,
  hideButton,
  labelColor,
}) => {
  const [selectorRef, { width }] = useMeasure();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className={`${parentClass ? parentClass : 'flex flex-col gap-4'}`}>
          {inputFields?.map((input) => (
            <FormField
              key={input?.id}
              control={form.control}
              name={input?.id}
              render={({ field }) => (
                <FormItem
                  className={`${childrenClass} ${
                    IsSwitch === input?.type && 'flex items-center gap-2 w-full'
                  }`}
                >
                  {/* Form label */}
                  <FormLabel
                    className={`flex ${
                      IsSwitch === input?.type
                        ? 'items-center'
                        : 'justify-between w-full mb-2'
                    } mt-0 ${
                      labelColor === 'white'
                        ? 'text-white'
                        : 'text-neutral-gray-500'
                    }`}
                  >
                    {input?.label}
                    {input?.helpText && (
                      <TooltipOverlay
                        content={input?.helpText}
                        className="max-w-[320px]"
                      >
                        <Icon name="info" size={14} className="ml-1" />
                      </TooltipOverlay>
                    )}
                  </FormLabel>
                  {/* type === IsSwitch, then show switcher/toggle */}
                  {IsSwitch === input?.type ? (
                    <FormControl>
                      <Switch
                        id={input?.id}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={input?.disabled}
                      />
                    </FormControl>
                  ) : input?.type === 'select' ? (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          ref={selectorRef}
                          className="min-w-[200px] w-full"
                        >
                          <SelectValue
                            placeholder={input?.placeholder}
                            defaultValue={input?.value}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent style={{ maxWidth: `${width + 18}px` }}>
                        {input?.selectorList?.map((select) => (
                          <SelectItem
                            value={select.value}
                            key={select?.value}
                            style={{ maxWidth: `${width - 16}px` }}
                          >
                            <div className="w-full flex gap-2">
                              <h6 className="text-sm">{select?.value}</h6>
                              {select?.description && (
                                <p className="text-sm">{select?.description}</p>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : input?.type === 'radio' ? (
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex items-center gap-8 mt-3"
                    >
                      {input?.radioSelectList?.map((radio) => {
                        return (
                          <FormControl key={radio?.id}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={radio?.id}
                                id={radio?.id}
                              />
                              <Label htmlFor={radio?.id}>{radio?.label}</Label>
                            </div>
                          </FormControl>
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <FormControl>
                      <Input
                        placeholder={input?.placeholder}
                        type={input?.type}
                        value={input?.value}
                        defaultValue={input?.value}
                        variant={variant}
                        disabled={input?.disabled}
                        {...field}
                      />
                    </FormControl>
                  )}
                  {input?.description && (
                    <FormDescription>{input?.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {!hideButton && (
          <Button
            type="submit"
            variant={buttonVariant}
            disabled={isDisabled}
            className={`${buttonAlignClass(buttonAlign)} ${
              buttonIconAlign === 'right' && 'flex-row-reverse'
            }`}
          >
            {buttonIcon && (
              <Icon name={buttonIcon ? buttonIcon : 'rotate-cw'} size={14} />
            )}
            {buttonText ? buttonText : 'Submit'}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FormWrapper;
