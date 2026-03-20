import { Modal, TextInput, NumberInput, Button, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    title: z.string().min(1, 'Введите наименование'),
    price: z.number({ error: 'Введите цену' }).positive('Цена должна быть больше 0'),
    brand: z.string().min(1, 'Введите вендора'),
    sku: z.string().min(1, 'Введите артикул'),
});

type FormValues = z.infer<typeof schema>;

interface Props {
    open: boolean;
    onClose: () => void;
}

export const AddProductModal = ({ open, onClose }: Props) => {
    const { 
        register, 
        handleSubmit, 
        control, 
        reset, 
        formState: { 
            errors, 
            isSubmitting 
        } 
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (values: FormValues) => {
        console.log('New product:', values);
        notifications.show({
            title: 'Успешно',
            message: 'Товар успешно добавлен',
            color: 'green',
        });
        handleClose();
    };

    return (
        <Modal
            opened={open}
            onClose={handleClose}
            title="Добавить товар"
            centered
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="md">
                    <TextInput
                        label="Наименование"
                        placeholder="Введите наименование"
                        error={errors.title?.message}
                        {...register('title')}
                    />
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Цена"
                                placeholder="Введите цену"
                                error={errors.price?.message}
                                min={0}
                                decimalScale={2}
                                value={field.value ?? ''}
                                onChange={(val) => field.onChange(val)}
                            />
                        )}
                    />
                    <TextInput
                        label="Вендор"
                        placeholder="Введите вендора"
                        error={errors.brand?.message}
                        {...register('brand')}
                    />
                    <TextInput
                        label="Артикул"
                        placeholder="Введите артикул"
                        error={errors.sku?.message}
                        {...register('sku')}
                    />
                    <Button type="submit" loading={isSubmitting} fullWidth mt="xs">
                        Добавить
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};
