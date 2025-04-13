
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { packageBox, shoppingCart, userRound, dollarSign, store } from 'lucide-react';

const VendorDashboardPage = () => {
  const { user } = useAuth();

  // Mock vendor data
  const mockProducts = [
    {
      id: 'PROD-001',
      name: 'Premium Wall Art',
      price: 89.99,
      inventory: 12,
      sales: 8,
    },
    {
      id: 'PROD-002',
      name: 'Modern Coffee Table',
      price: 249.99,
      inventory: 5,
      sales: 3,
    },
    {
      id: 'PROD-003',
      name: 'Decorative Cushion Set',
      price: 59.99,
      inventory: 20,
      sales: 15,
    },
  ];

  const mockStats = {
    totalSales: 1256.93,
    totalOrders: 26,
    totalCustomers: 18,
    totalProducts: 3,
  };

  if (!user) {
    return (
      <Layout>
        <div className="marketplace-container py-12">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Dashboard</CardTitle>
              <CardDescription>You need to be logged in as a vendor to access this page.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  if (!user.isVendor) {
    return (
      <Layout>
        <div className="marketplace-container py-12">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Dashboard</CardTitle>
              <CardDescription>You need to have a vendor account to access this page.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="marketplace-container py-12">
        <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
        
        {/* Stats overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-marketplace-purple/10 rounded-full mr-4">
                  <dollarSign className="h-6 w-6 text-marketplace-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <h3 className="text-2xl font-bold">${mockStats.totalSales.toFixed(2)}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-marketplace-orange/10 rounded-full mr-4">
                  <shoppingCart className="h-6 w-6 text-marketplace-orange" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalOrders}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <userRound className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customers</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalCustomers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <packageBox className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Products</p>
                  <h3 className="text-2xl font-bold">{mockStats.totalProducts}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Products table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Manage your product inventory and track sales</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorDashboardPage;
