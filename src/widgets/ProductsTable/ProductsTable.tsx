import { useState } from 'react';
import {
    Table, Checkbox, Group, Text, Button, ActionIcon,
    Pagination, Box,
} from '@mantine/core';
import { RefreshCw, Plus, MoreHorizontal, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { useProducts } from '../../features/products/hooks/useProducts';
import { useProductsStore } from '../../features/products/model/productsStore';
import { formatPrice } from '../../shared/lib/formatPrice';
import type { Product, SortField } from '../../entities/product/type';

const SortHeader = ({ field, label }: { field: SortField; label: string }) => {
    const { sortBy, order, setSort } = useProductsStore();
    const isActive = sortBy === field;

    return (
        <Table.Th
            onClick={() => setSort(field, isActive && order === 'asc' ? 'desc' : 'asc')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
        >
            <Group gap={4} wrap="nowrap">
                <span>{label}</span>
                {isActive
                    ? order === 'asc'
                        ? <ChevronUp size={14} />
                        : <ChevronDown size={14} />
                    : <ChevronsUpDown size={14} style={{ color: '#ccc' }} />
                }
            </Group>
        </Table.Th>
    );
};

const PriceCell = ({ price }: { price: number }) => {
    const formatted = formatPrice(price);
    const commaIndex = formatted.lastIndexOf(',');
    return (
        <span>
            {formatted.slice(0, commaIndex)}
            <Text span c="dimmed" inherit>{formatted.slice(commaIndex)}</Text>
        </span>
    );
};

export const ProductsTable = ({ onAdd }: { onAdd: () => void }) => {
    const { page, limit, setPage } = useProductsStore();
    const { data, isFetching, refetch } = useProducts();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const products = data?.products ?? [];
    const allSelected = products.length > 0 && selectedIds.length === products.length;
    const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

    const toggleAll = () => {
        setSelectedIds(allSelected ? [] : products.map((p) => p.id));
    };

    const toggleRow = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <Box>
            <Group justify="space-between" mb="md">
                <Text fw={600} size='lg'>Все позиции</Text>
                <Group gap="xs">
                    <ActionIcon variant="subtle" color="gray" onClick={() => refetch()} loading={isFetching}>
                        <RefreshCw size={16} />
                    </ActionIcon>
                    <Button leftSection={<Plus size={16} />} onClick={onAdd}>
                        Добавить
                    </Button>
                </Group>
            </Group>

            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={40}>
                            <Checkbox checked={allSelected} onChange={toggleAll} />
                        </Table.Th>
                        <Table.Th w={56} />
                        <SortHeader field="title" label="Наименование" />
                        <Table.Th>Вендор</Table.Th>
                        <Table.Th>Артикул</Table.Th>
                        <SortHeader field="rating" label="Оценка" />
                        <SortHeader field="price" label="Цена, Р" />
                        <Table.Th w={100} />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {products.map((product: Product) => (
                        <Table.Tr
                            key={product.id}
                            bg={selectedIds.includes(product.id) ? 'var(--mantine-color-blue-0)' : undefined}
                        >
                            <Table.Td>
                                <Checkbox
                                    checked={selectedIds.includes(product.id)}
                                    onChange={() => toggleRow(product.id)}
                                />
                            </Table.Td>
                            <Table.Td>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4 }}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={500}>{product.title}</Text>
                                <Text size="xs" c="dimmed">{product.category}</Text>
                            </Table.Td>
                            <Table.Td>
                                <Text fw={700}>{product.brand}</Text>
                            </Table.Td>
                            <Table.Td>{product.sku}</Table.Td>
                            <Table.Td>
                                <Text c={product.rating < 3.5 ? 'red' : undefined}>
                                    {product.rating}/5
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <PriceCell price={product.price} />
                            </Table.Td>
                            <Table.Td>
                                <Group gap="xs" justify="flex-end">
                                    <ActionIcon variant="filled" color="blue" size="sm" radius="xl">
                                        <Plus size={14} />
                                    </ActionIcon>
                                    <ActionIcon variant="outline" color="gray" size="sm" radius="xl">
                                        <MoreHorizontal size={14} />
                                    </ActionIcon>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Group justify="space-between" mt="md">
                <Text size="sm" c="dimmed">
                    Показано{' '}
                    <Text span fw={700} c="dark" inherit>
                        {(page - 1) * limit + 1}-{Math.min(page * limit, data?.total ?? 0)}
                    </Text>{' '}
                    из{' '}
                    <Text span fw={700} c="dark" inherit>
                        {data?.total ?? 0}
                    </Text>
                </Text>
                <Pagination total={totalPages} value={page} onChange={setPage} size="sm" />
            </Group>
        </Box>
    );
};
