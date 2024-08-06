import { useState } from 'react'
import { Box, Container, Grid, Paper, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem } from '@mui/material'
import Header from '../componentes/Header'
import Sidebar from '../componentes/Sidebar'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const purchasesData = [
  // Example data for purchases
  {
    id: 1,
    date: '2023-01-01',
    number: 'PUR001',
    supplier: 'Supplier A',
    description: 'Purchase description',
    total: 1000,
    status: 'PAID',
  },
  // ... more example data
]

const PurchasesForm = ({ open, handleClose, purchase, handleSave }) => {
  const [formData, setFormData] = useState(purchase || {
    date: '',
    number: '',
    supplier: '',
    description: '',
    total: '',
    status: '',
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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{purchase ? 'Edit Purchase' : 'Add Purchase'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {purchase ? 'Edit the purchase information' : 'Enter the new purchase information'}
        </DialogContentText>
        <TextField margin="dense" label="Date" name="date" fullWidth variant="outlined" value={formData.date} onChange={handleChange} />
        <TextField margin="dense" label="Number" name="number" fullWidth variant="outlined" value={formData.number} onChange={handleChange} />
        <TextField margin="dense" label="Supplier" name="supplier" fullWidth variant="outlined" value={formData.supplier} onChange={handleChange} />
        <TextField margin="dense" label="Description" name="description" fullWidth variant="outlined" value={formData.description} onChange={handleChange} />
        <TextField margin="dense" label="Total" name="total" fullWidth variant="outlined" value={formData.total} onChange={handleChange} />
        <TextField margin="dense" label="Status" name="status" fullWidth variant="outlined" value={formData.status} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const Purchases = () => {
  const [open, setOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)
  const [purchases, setPurchases] = useState(purchasesData)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (purchase = null) => {
    setSelectedPurchase(purchase)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedPurchase(null)
  }

  const handleSave = (purchase) => {
    if (selectedPurchase) {
      setPurchases(purchases.map((p) => (p.id === purchase.id ? purchase : p)))
    } else {
      purchase.id = purchases.length + 1
      setPurchases([...purchases, purchase])
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const subcategories = ['Quotes', 'Orders', 'Delivery Notes', 'Proforma Invoices', 'Invoices']

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#EFFFFD' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: '#1A1A40',
            borderRight: 1,
            borderColor: 'divider'
          }}
        >
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: '#EFFFFD',
            p: 3,
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
              Purchases
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
                sx={{ bgcolor: '#ffffff', color: '#000000', ml: 2 }} 
                startIcon={<AddIcon />} 
                onClick={() => handleOpen()}
              >
                Add Purchase
              </Button>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleMenuClick}
                variant="outlined"
                sx={{ color: '#000000', borderColor: '#000000' }}
              >
                Subcategories
                <MoreVertIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory} onClick={handleMenuClose}>
                    {subcategory}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Supplier</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell>{purchase.number}</TableCell>
                      <TableCell>{purchase.supplier}</TableCell>
                      <TableCell>{purchase.description}</TableCell>
                      <TableCell>{purchase.total}</TableCell>
                      <TableCell>{purchase.status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpen(purchase)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setPurchases(purchases.filter((p) => p.id !== purchase.id))}>
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
      <PurchasesForm open={open} handleClose={handleClose} purchase={selectedPurchase} handleSave={handleSave} />
    </Box>
  )
}

export default Purchases
