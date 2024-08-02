import { useState } from 'react'
import { Box, Container, Typography, Button, TextField, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, FormControlLabel, Menu, MenuItem, TableRow, TableContainer, TableHead, Table, TableCell, TableBody } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import PrintIcon from '@mui/icons-material/Print'

const productsData = [
  // Example data for products
  {
    id: 1,
    name: 'Product A',
    description: 'Description of product A',
    reference: 'REF001',
    factoryCode: 'CF001',
    variant: 'Variant A',
    tags: 'Tag1',
    type: 'Type A',
    warehouse: 'Warehouse A',
    channel: 'Channel A',
    account: 'Account A',
    stock: 100,
    cost: 10,
    purchasePrice: 12,
    costValue: 1000,
    saleValue: 1200,
    subtotal: 1000,
    vat: 21,
    retention: 0,
    equivalenceSurcharge: 0,
    taxes: 210,
    total: 1210,
  },
  // ... more example data
]

const ProductForm = ({ open, handleClose, product, handleSave }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    reference: '',
    factoryCode: '',
    variant: '',
    tags: '',
    type: '',
    warehouse: '',
    channel: '',
    account: '',
    stock: '',
    cost: '',
    purchasePrice: '',
    costValue: '',
    saleValue: '',
    subtotal: '',
    vat: '',
    retention: '',
    equivalenceSurcharge: '',
    taxes: '',
    total: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    handleSave(formData)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {product ? 'Edit the product information' : 'Enter the new product information'}
        </DialogContentText>
        <TextField margin="dense" label="Name" name="name" fullWidth variant="outlined" value={formData.name} onChange={handleChange} />
        <TextField margin="dense" label="Description" name="description" fullWidth variant="outlined" value={formData.description} onChange={handleChange} />
        <TextField margin="dense" label="Reference" name="reference" fullWidth variant="outlined" value={formData.reference} onChange={handleChange} />
        <TextField margin="dense" label="Factory Code" name="factoryCode" fullWidth variant="outlined" value={formData.factoryCode} onChange={handleChange} />
        <TextField margin="dense" label="Variant" name="variant" fullWidth variant="outlined" value={formData.variant} onChange={handleChange} />
        <TextField margin="dense" label="Tags" name="tags" fullWidth variant="outlined" value={formData.tags} onChange={handleChange} />
        <TextField margin="dense" label="Type" name="type" fullWidth variant="outlined" value={formData.type} onChange={handleChange} />
        <TextField margin="dense" label="Warehouse" name="warehouse" fullWidth variant="outlined" value={formData.warehouse} onChange={handleChange} />
        <TextField margin="dense" label="Channel" name="channel" fullWidth variant="outlined" value={formData.channel} onChange={handleChange} />
        <TextField margin="dense" label="Account" name="account" fullWidth variant="outlined" value={formData.account} onChange={handleChange} />
        <TextField margin="dense" label="Stock" name="stock" fullWidth variant="outlined" value={formData.stock} onChange={handleChange} />
        <TextField margin="dense" label="Cost" name="cost" fullWidth variant="outlined" value={formData.cost} onChange={handleChange} />
        <TextField margin="dense" label="Purchase Price" name="purchasePrice" fullWidth variant="outlined" value={formData.purchasePrice} onChange={handleChange} />
        <TextField margin="dense" label="Cost Value" name="costValue" fullWidth variant="outlined" value={formData.costValue} onChange={handleChange} />
        <TextField margin="dense" label="Sale Value" name="saleValue" fullWidth variant="outlined" value={formData.saleValue} onChange={handleChange} />
        <TextField margin="dense" label="Subtotal" name="subtotal" fullWidth variant="outlined" value={formData.subtotal} onChange={handleChange} />
        <TextField margin="dense" label="VAT (%)" name="vat" fullWidth variant="outlined" value={formData.vat} onChange={handleChange} />
        <TextField margin="dense" label="Retention" name="retention" fullWidth variant="outlined" value={formData.retention} onChange={handleChange} />
        <TextField margin="dense" label="Equivalence Surcharge" name="equivalenceSurcharge" fullWidth variant="outlined" value={formData.equivalenceSurcharge} onChange={handleChange} />
        <TextField margin="dense" label="Taxes" name="taxes" fullWidth variant="outlined" value={formData.taxes} onChange={handleChange} />
        <TextField margin="dense" label="Total" name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} sx={{ color: '#1A1A40', fontWeight: '500' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Inventory = () => {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState(productsData)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (product = null) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleSave = (product) => {
    if (selectedProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)))
    } else {
      product.id = products.length + 1
      setProducts([...products, product])
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const operations = [
    { name: 'Update Stock', icon: <ImportExportIcon /> },
    { name: 'Transfer Stock', icon: <ImportExportIcon /> },
    { name: 'Print Barcodes', icon: <PrintIcon /> },
    { name: 'Import/Update via Excel', icon: <ImportExportIcon /> },
  ]

  const productProperties = [
    { name: 'Categories' },
    { name: 'Product Families' },
    { name: 'Variant Groups' },
    { name: 'Price Lists' },
    { name: 'Logistics Stages' },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F3F4F6' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 1,
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1201,
            position: 'fixed',
            height: '100%',
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#F3F4F6',
            p: 3,
            marginLeft: '240px',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom sx={{ color: '#1A1A40', fontWeight: '600', fontFamily: 'Roboto, sans-serif' }}>
              Inventory
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField 
                variant="outlined" 
                placeholder="Search..." 
                fullWidth 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }} 
              />
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'linear-gradient(90deg, #2666CF, #6A82FB)', color: '#ffffff', fontWeight: '500', textTransform: 'none', borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.1)', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                New Product
              </Button>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {operations.map((operation) => (
                  <MenuItem key={operation.name} onClick={handleMenuClose}>
                    {operation.icon}
                    {operation.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Reference</TableCell>
                    <TableCell>Factory Code</TableCell>
                    <TableCell>Variant</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Warehouse</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Purchase Price</TableCell>
                    <TableCell>Cost Value</TableCell>
                    <TableCell>Sale Value</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>VAT (%)</TableCell>
                    <TableCell>Retention</TableCell>
                    <TableCell>Equivalence Surcharge</TableCell>
                    <TableCell>Taxes</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} sx={{ '&:hover': { bgcolor: '#F1F1F1' } }}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.reference}</TableCell>
                      <TableCell>{product.factoryCode}</TableCell>
                      <TableCell>{product.variant}</TableCell>
                      <TableCell>{product.tags}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>{product.warehouse}</TableCell>
                      <TableCell>{product.channel}</TableCell>
                      <TableCell>{product.account}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.cost}</TableCell>
                      <TableCell>{product.purchasePrice}</TableCell>
                      <TableCell>{product.costValue}</TableCell>
                      <TableCell>{product.saleValue}</TableCell>
                      <TableCell>{product.subtotal}</TableCell>
                      <TableCell>{product.vat}</TableCell>
                      <TableCell>{product.retention}</TableCell>
                      <TableCell>{product.equivalenceSurcharge}</TableCell>
                      <TableCell>{product.taxes}</TableCell>
                      <TableCell>{product.total}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(product)} sx={{ color: '#1A1A40' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setProducts(products.filter((p) => p.id !== product.id))} sx={{ color: '#B00020' }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
      <ProductForm open={open} handleClose={handleClose} product={selectedProduct} handleSave={handleSave} />
    </Box>
  )
}

export default Inventory
