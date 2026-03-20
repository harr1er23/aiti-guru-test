import { useState, useEffect } from 'react';
import { TextInput, Group, ActionIcon, Indicator, Paper, Box, Title } from '@mantine/core';
import { Search, Globe, Bell, Mail, SlidersHorizontal } from 'lucide-react';
import { ProductsTable } from '../../widgets/ProductsTable/ProductsTable';
import { AddProductModal } from '../../widgets/AddProductModal/AddProductModal';
import { useProductsStore } from '../../features/products/model/productsStore';
import { useDebounce } from '../../shared/lib/useDebounce';

const ProductsPage = () => {
    const { setSearch } = useProductsStore();
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const debouncedSearch = useDebounce(inputValue, 400);

    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch, setSearch]);

    return (
        <Box style={{ minHeight: '100vh', background: '#f5f5f5', padding: 24 }}>
            <Paper shadow="xs" radius="md">
                <Group justify="space-between" p="md" align="center" gap="md">
                    <Title fw={600} size={24} style={{ whiteSpace: 'nowrap' }}>Товары</Title>
                    <TextInput
                        leftSection={<Search size={16} />}
                        placeholder="Найти"
                        variant='filled'
                        radius={7}
                        className='mx-50'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <Group gap="xs">
                        <ActionIcon variant="subtle" color="gray" size="lg">
                            <Globe size={20} />
                        </ActionIcon>
                        <Indicator label="12" size={16} color="blue">
                            <ActionIcon variant="subtle" color="gray" size="lg">
                                <Bell size={20} />
                            </ActionIcon>
                        </Indicator>
                        <ActionIcon variant="subtle" color="gray" size="lg">
                            <Mail size={20} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray" size="lg">
                            <SlidersHorizontal size={20} />
                        </ActionIcon>
                    </Group>
                </Group>
            </Paper>
            <Paper shadow="xs" radius="md" mt="30">
              <Box p="md" mt="10">
                <ProductsTable onAdd={() => setIsModalOpen(true)} />
              </Box>
            </Paper>
            <AddProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Box>
    );
};

export default ProductsPage;
