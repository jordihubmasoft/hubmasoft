import dynamic from 'next/dynamic'; // Importación dinámica para Next.js
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Tab,
  Tabs,
  Avatar,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PrintIcon from '@mui/icons-material/Print';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import React from 'react';

// Carga dinámica de componentes de Konva
const Stage = dynamic(() => import('react-konva').then(mod => mod.Stage), { ssr: false });
const Layer = dynamic(() => import('react-konva').then(mod => mod.Layer), { ssr: false });
const Rect = dynamic(() => import('react-konva').then(mod => mod.Rect), { ssr: false });
const Circle = dynamic(() => import('react-konva').then(mod => mod.Circle), { ssr: false });
const Text = dynamic(() => import('react-konva').then(mod => mod.Text), { ssr: false });



const RestauracionTPV = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [empleados, setEmpleados] = useState([{ nombre: 'Félix', role: 'Cuenta principal' }]);
    const [editable, setEditable] = useState(false); // Controlar si se puede editar o no
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // Mesa seleccionada para el TPV
    const [carritosPorMesa, setCarritosPorMesa] = useState({}); // Este es el estado que almacena los carritos por mesa
    const [selectedCategory, setSelectedCategory] = useState(null); // Categoría seleccionada
    const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
    const router = useRouter();
    const cart = carritosPorMesa[mesaSeleccionada] || []; // Obtener el carrito de la mesa seleccionada
    const [openPaymentModal, setOpenPaymentModal] = useState(false); // Estado para abrir/cerrar el modal
    const [paidAmount, setPaidAmount] = useState(0); // Monto pagado
    const [change, setChange] = useState(0); // Cambio
    const [diners, setDiners] = useState(1); // Número de comensales
    const [mesaOcupada, setMesaOcupada] = useState({}); // Estado para manejar las mesas ocupadas


  // Función para agregar un nuevo empleado
  const handleAddEmpleado = () => {
    const nombre = prompt("Introduce el nombre del nuevo empleado:");
    if (nombre) {
      setEmpleados([...empleados, { nombre, role: 'Empleado' }]);
    }
  };

  
  
  const handleRemoveFromCart = (index) => {
    // Eliminar producto del carrito de la mesa seleccionada
    setCarritosPorMesa((prevCarritos) => {
      const carritoActual = [...(prevCarritos[mesaSeleccionada] || [])];
      carritoActual.splice(index, 1);
      return {
        ...prevCarritos,
        [mesaSeleccionada]: carritoActual,
      };
    });
  };
  
  const handleClearCart = () => {
    // Vaciar el carrito de la mesa seleccionada
    setCarritosPorMesa((prevCarritos) => ({
      ...prevCarritos,
      [mesaSeleccionada]: [],
    }));
  };
  

  // Datos de mesas para comedor y terraza (distribución optimizada)
  const initialMesasComedor = [
    { x: 150, y: 80, id: 1, label: 'Mesa 1' },
    { x: 450, y: 80, id: 2, label: 'Mesa 2' },
    { x: 750, y: 80, id: 3, label: 'Mesa 3' },
    { x: 150, y: 250, id: 4, label: 'Mesa 4' },
    { x: 450, y: 250, id: 5, label: 'Mesa 5' },
    { x: 750, y: 250, id: 6, label: 'Mesa 6' },
    { x: 150, y: 420, id: 7, label: 'Mesa 7' },
    { x: 450, y: 420, id: 8, label: 'Mesa 8' },
    { x: 750, y: 420, id: 9, label: 'Mesa 9' },
  ];

  const [mesasComedor, setMesasComedor] = useState(initialMesasComedor);

  // Estado para controlar la posición de la barra
  const [barraPos, setBarraPos] = useState({ x: 900, y: 80 });

  // Configuración para la terraza
  const mesasTerraza = [
    { x: 150, y: 80, id: 1, label: 'Terraza 1' },
    { x: 450, y: 80, id: 2, label: 'Terraza 2' },
    { x: 750, y: 80, id: 3, label: 'Terraza 3' },
    { x: 300, y: 300, id: 4, label: 'Terraza 4' },
    { x: 600, y: 300, id: 5, label: 'Terraza 5' },
  ];

  const categorias = ["Refrescos", "Cafés", "Cervezas", "Pizzas", "Bocadillos", "Postres"];
  const productos = {
    Refrescos: [{ name: "Coca-Cola", price: 1.90 }, { name: "Fanta", price: 1.80 }],
    Cafés: [{ name: "Café Solo", price: 1.50 }],
    Cervezas: [{ name: "Cerveza", price: 2.00 }],
    Pizzas: [{ name: "Pizza Margarita", price: 8.50 }],
    Bocadillos: [{ name: "Bocadillo de Jamón", price: 3.50 }],
    Postres: [{ name: "Helado", price: 2.50 }],
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDragEnd = (e, id) => {
    if (editable) {
      const newMesas = mesasComedor.map((mesa) =>
        mesa.id === id ? { ...mesa, x: e.target.x(), y: e.target.y() } : mesa
      );
      setMesasComedor(newMesas);
    }
  };

  // Función para seleccionar una mesa
  const handleMesaSeleccionada = (id) => {
    setMesaSeleccionada(id);
  };

  const handleAddToCart = (producto) => {
    // Añadir producto solo al carrito de la mesa seleccionada
    setCarritosPorMesa((prevCarritos) => {
      const nuevoCarrito = prevCarritos[mesaSeleccionada] ? [...prevCarritos[mesaSeleccionada], producto] : [producto];
      
      // Marca la mesa como ocupada
      setMesaOcupada((prevOcupadas) => ({
        ...prevOcupadas,
        [mesaSeleccionada]: true, // La mesa está ocupada
      }));
  
      return {
        ...prevCarritos,
        [mesaSeleccionada]: nuevoCarrito,
      };
    });
  };
  

  // Función para mover la barra
  const handleBarraDragEnd = (e) => {
    if (editable) {
      setBarraPos({ x: e.target.x(), y: e.target.y() });
    }
  };
  

// Si una mesa es seleccionada, mostrar la vista del TPV
if (mesaSeleccionada) {
    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0); // Total a pagar
  
    // Función para abrir el modal de pago
    const handleOpenPaymentModal = () => {
      setOpenPaymentModal(true);
    };
  
    // Función para cerrar el modal de pago
    const handleClosePaymentModal = () => {
      setOpenPaymentModal(false);
      setPaidAmount(0);
      setChange(0);
    };
  
    // Función para manejar el cambio cuando se ingresa el monto pagado
    const handlePaidAmountChange = (e) => {
      const amount = parseFloat(e.target.value) || 0;
      setPaidAmount(amount);
      setChange(amount - totalAmount);
    };
  
    // Función para dividir el pago entre comensales
    const handleDinersChange = (number) => {
      setDiners(number);
    };
  
    // Función para manejar la calculadora
    // Función para manejar la calculadora
    const handleCalculatorInput = (value: string) => {
        if (value === '.') {
        // Si ya hay un punto en el número, no añadir otro
        if (!String(paidAmount).includes('.')) {
            setPaidAmount(parseFloat(paidAmount.toString() + '.'));
        }
        } else {
        // Si el valor es "0" y ya hay un "0" inicial, evitar concatenarlo
        if (value === '0' && paidAmount === 0) return;
    
        const newAmount = parseFloat(paidAmount.toString() + value) || 0;
        setPaidAmount(newAmount);
        setChange(newAmount - totalAmount);
        }
    };
  
      
      
  
    // Función para limpiar el cálculo
    const handleClearCalculator = () => {
      setPaidAmount(0);
      setChange(0);
    };
  
    // Función para confirmar el pago y liberar la mesa
    const handleConfirmPayment = () => {
        // Vaciamos el carrito de la mesa
        setCarritosPorMesa((prevCarritos) => ({
          ...prevCarritos,
          [mesaSeleccionada]: [],
        }));
      
        // Marcamos la mesa como libre
        setMesaOcupada((prevOcupadas) => ({
          ...prevOcupadas,
          [mesaSeleccionada]: false, // La mesa se vuelve libre
        }));
      
        // Cerrar el modal de pago y resetear los valores
        setOpenPaymentModal(false);
        setPaidAmount(0);
        setChange(0);
        setMesaSeleccionada(null); // Deseleccionar la mesa
      };
    
      const handleEqualInput = () => {
        // Aquí puedes definir la lógica para manejar cuando el usuario presiona `=`.
        // Si solo deseas confirmar el monto pagado, puedes simplemente dejarlo vacío.
      };
      
      
    // Función para confirmar el pago con tarjeta
    const handleConfirmCardPayment = () => {
        // Aquí puedes añadir la lógica para enviar la transacción a un datáfono si es necesario.
        // Simulamos un pago exitoso por tarjeta

        // Si el pago no cubre el total, la mesa no se libera
        if (paidAmount >= totalAmount) {
            setCarritosPorMesa((prevCarritos) => ({
                ...prevCarritos,
                [mesaSeleccionada]: [],
            }));
            setMesaOcupada((prevOcupadas) => ({
                ...prevOcupadas,
                [mesaSeleccionada]: false, // Liberamos la mesa
            }));
            setMesaSeleccionada(null);
        } else {
            // Si el monto pagado es menor, reducimos el total por pagar
            setCarritosPorMesa((prevCarritos) => ({
                ...prevCarritos,
                [mesaSeleccionada]: cart.map((item) => {
                    return { ...item, price: totalAmount - paidAmount };
                }),
            }));
            setMesaOcupada((prevOcupadas) => ({
                ...prevOcupadas,
                [mesaSeleccionada]: true, // La mesa sigue ocupada
            }));
        }

        // Resetear valores
        setOpenPaymentModal(false);
        setPaidAmount(0);
        setChange(0);
};

  
    return (
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F0F4F8', p: 2 }}>
        <Grid container sx={{ flexGrow: 1, height: '100%', boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
          {/* Columna izquierda: Botón y Categorías */}
          <Grid item xs={2} sx={{ backgroundColor: '#F4F6F8', p: 3, height: '100%' }}>
            {/* Botón de volver */}
            <IconButton
              onClick={() => setMesaSeleccionada(null)}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#2666CF',
                borderRadius: '50%',
                boxShadow: 1,
                mb: 3,
                '&:hover': { backgroundColor: '#E0E0E0' },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
  
            {/* Categorías */}
            <Paper sx={{ p: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2666CF', fontWeight: 'bold' }}>Categorías</Typography>
              <Box>
                {categorias.map((categoria) => (
                  <Button
                    key={categoria}
                    fullWidth
                    variant={categoria === selectedCategory ? "contained" : "outlined"}
                    onClick={() => setSelectedCategory(categoria)}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      boxShadow: categoria === selectedCategory ? 3 : 1,
                      transition: 'all 0.3s ease',
                      backgroundColor: categoria === selectedCategory ? '#2666CF' : '#FFFFFF',
                      color: categoria === selectedCategory ? '#FFFFFF' : '#2666CF',
                    }}
                  >
                    {categoria}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
  
          {/* Columna central: Productos */}
          <Grid item xs={7} sx={{ p: 3, overflowY: 'auto' }}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                Productos {selectedCategory && `de ${selectedCategory}`}
              </Typography>
              {/* Barra de búsqueda */}
              <TextField
                placeholder="Buscar productos..."
                fullWidth
                variant="outlined"
                sx={{ mb: 3 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
  
              <Grid container spacing={3}>
                {selectedCategory && productos[selectedCategory]
                  .filter((prod) => prod.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((producto) => (
                    <Grid item xs={6} key={producto.name}>
                      <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 }, transition: 'all 0.3s ease' }}>
                        <CardContent>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{producto.name}</Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>{producto.price.toFixed(2)}€</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ backgroundColor: '#2666CF', color: 'white', '&:hover': { backgroundColor: '#1f53a0' } }}
                            onClick={() => handleAddToCart(producto)}
                          >
                            Añadir
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Paper>
          </Grid>
  
          {/* Columna derecha: Carrito */}
          <Grid item xs={3} sx={{ p: 3 }}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2666CF' }}>Carrito de la Mesa {mesaSeleccionada}</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {cart.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price.toFixed(2)}€</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
  
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Sub Total: {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}€
                </Typography>
              </Box>
  
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="success" sx={{ width: '48%' }} onClick={handleOpenPaymentModal}>
                  Efectivo
                </Button>
                <Button variant="contained" color="info" sx={{ width: '48%' }} onClick={handleOpenPaymentModal}>
                  Tarjeta
                </Button>
              </Box>
  
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleClearCart}
              >
                Cancelar pedido
              </Button>
            </Paper>
          </Grid>
        </Grid>
  
       {/* Modal de Pago con Tarjeta */}
        <Dialog open={openPaymentModal} onClose={handleClosePaymentModal}>
        <DialogTitle>Pagar en tarjeta</DialogTitle>
        <DialogContent>
            <Typography>Total a pagar: {totalAmount.toFixed(2)}€</Typography>
            <TextField
            label="Total pagado"
            type="number"
            fullWidth
            value={paidAmount}
            onChange={handlePaidAmountChange}
            sx={{ mt: 2 }}
            />
            <Typography sx={{ mt: 2 }}>Cambio: {change.toFixed(2)}€</Typography>

            {/* Mini Calculadora */}
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Centramos la calculadora
                alignItems: 'center',
                mt: 3,
                p: 2,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f5f5f5', // Fondo de la calculadora
                maxWidth: '300px', // Ajustamos el tamaño máximo de la calculadora
                margin: 'auto',
            }}
            >
            <Box
                sx={{
                width: '100%',
                p: 2,
                backgroundColor: '#ffffff', // Fondo blanco del panel de la calculadora
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)', // Tres columnas
                gridGap: '10px',
                }}
            >
                {[1, 2, 3].map((num) => (
                <Button
                    key={num}
                    variant="contained"
                    onClick={() => handleCalculatorInput(num.toString())}
                    sx={{
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: '#d5d5d5',
                    },
                    }}
                >
                    {num}
                </Button>
                ))}

                {[4, 5, 6].map((num) => (
                <Button
                    key={num}
                    variant="contained"
                    onClick={() => handleCalculatorInput(num.toString())}
                    sx={{
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: '#d5d5d5',
                    },
                    }}
                >
                    {num}
                </Button>
                ))}

                {[7, 8, 9].map((num) => (
                <Button
                    key={num}
                    variant="contained"
                    onClick={() => handleCalculatorInput(num.toString())}
                    sx={{
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: '#d5d5d5',
                    },
                    }}
                >
                    {num}
                </Button>
                ))}

                <Button
                variant="contained"
                onClick={handleClearCalculator}
                sx={{
                    backgroundColor: '#f44336', // Rojo para el botón de borrar
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                    backgroundColor: '#e53935',
                    },
                }}
                >
                C
                </Button>

                <Button
                variant="contained"
                onClick={() => handleCalculatorInput("0")}
                sx={{
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    gridColumn: 'span 2', // El botón 0 ocupa dos columnas
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                    backgroundColor: '#d5d5d5',
                    },
                }}
                >
                0
                </Button>

                <Button
                variant="contained"
                onClick={() => handleCalculatorInput('.')} // Corrigiendo el manejo del decimal
                sx={{
                    backgroundColor: '#9e9e9e', // Botón de punto decimal
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                    backgroundColor: '#8e8e8e',
                    },
                }}
                >
                .
                </Button>

                <Button
                variant="contained"
                onClick={handleEqualInput}
                sx={{
                    backgroundColor: '#4caf50', // Verde para el botón de igual
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '1.2rem',
                    gridColumn: 'span 3', // Ocupa toda la fila
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                    backgroundColor: '#43a047',
                    },
                }}
                >
                =
                </Button>
            </Box>
            </Box>

            {/* Dividir el pago entre comensales */}
            <Typography sx={{ mt: 2 }}>Dividir entre:</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {[1, 2, 3, 4, 5, 6].map((number) => (
                <Button
                key={number}
                variant={number === diners ? 'contained' : 'outlined'}
                onClick={() => handleDinersChange(number)}
                >
                {number}
                </Button>
            ))}
            </Box>

            <Typography sx={{ mt: 2 }}>Pago por persona: {(totalAmount / diners).toFixed(2)}€</Typography>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClosePaymentModal} color="primary">
            Cancelar
            </Button>
            <Button onClick={handleConfirmCardPayment} color="success">
            Enviar pago a datáfono
            </Button>
        </DialogActions>
        </Dialog>

      </Box>
    );
  }
  
  const [stageWidth, setStageWidth] = useState(0);

// Hook useEffect debe estar siempre fuera de condicionales
useEffect(() => {
  // Verifica si estamos en el cliente
  if (typeof window !== 'undefined') {
    setStageWidth(window.innerWidth - 300);
  }
}, []);

// Si una mesa es seleccionada, mostrar la vista del TPV
const mesaVista = mesaSeleccionada ? (
  <Box sx={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#F0F4F8', p: 2 }}>
    {/* TODO: Aquí puedes mover tu contenido del carrito */}
  </Box>
) : null;
  
  

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, bgcolor: '#FFFFFF', padding: 3 }}>
        {/* Botón de volver */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            backgroundColor: '#F4F6F8',
            color: '#2666CF',
            mb: 3,
            borderRadius: '50%',
            border: 'none',
            '&:hover': { backgroundColor: '#E0E0E0' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Título */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          TPV - Restauración
        </Typography>

        {/* Diseño interactivo de mesas con un fondo de suelo realista */}
        <Paper
            sx={{
                p: 3,
                mb: 4,
                backgroundImage: 'url("/img/concrete.jpg")', // Fondo del suelo
                backgroundSize: 'cover',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
            >
              <Stage width={stageWidth} height={600} style={{ border: '1px solid black' }}>
                <Layer>
                {/* Dibujar cocina */}
                <Rect
                    x={10}
                    y={10}
                    width={200}
                    height={150}
                    fill="#F39C12" // Color naranja para la cocina
                    cornerRadius={10}
                    shadowBlur={10}
                />
                <Text
                    text="Cocina"
                    x={60}
                    y={60}
                    fontSize={18}
                    fontStyle="bold"
                    fill="#FFFFFF"
                />

                {/* Dibujar baños */}
                <Rect
                    x={10}
                    y={500}
                    width={100}
                    height={80}
                    fill="#2980B9" // Color azul para el baño de hombres
                    cornerRadius={10}
                    shadowBlur={10}
                />
                <Text
                    text="Hombres"
                    x={30}
                    y={540}
                    fontSize={12}
                    fontStyle="bold"
                    fill="#FFFFFF"
                />
                
                <Rect
                    x={120}
                    y={500}
                    width={100}
                    height={80}
                    fill="#E74C3C" // Color rojo para el baño de mujeres
                    cornerRadius={10}
                    shadowBlur={10}
                />
                <Text
                    text="Mujeres"
                    x={140}
                    y={540}
                    fontSize={12}
                    fontStyle="bold"
                    fill="#FFFFFF"
                />

                {/* Dibujar plantas */}
                <Circle
                    x={450}
                    y={30}
                    radius={30}
                    fill="#27AE60" // Verde para la planta
                    shadowBlur={10}
                />
                <Rect
                    x={430}
                    y={60}
                    width={40}
                    height={15}
                    fill="#8B4513" // Marrón para la maceta
                    cornerRadius={5}
                />

                <Circle
                    x={650}
                    y={30}
                    radius={30}
                    fill="#27AE60"
                    shadowBlur={10}
                />
                <Rect
                    x={630}
                    y={60}
                    width={40}
                    height={15}
                    fill="#8B4513"
                    cornerRadius={5}
                />

                {/* Dibujar máquinas */}
                <Rect
                    x={500}
                    y={10}
                    width={100}
                    height={50}
                    fill="#7F8C8D" // Gris para una máquina de bebidas
                    shadowBlur={5}
                    cornerRadius={5}
                />
                <Text
                    text="Entrada"
                    x={510}
                    y={25}
                    fontSize={12}
                    fontStyle="bold"
                    fill="#FFFFFF"
                />

                {/* Dibujar mesas con sillas alrededor */}
                {(selectedTab === 0 ? mesasComedor : mesasTerraza).map((mesa) => (
                    <React.Fragment key={mesa.id}>
                    <Circle
                        x={mesa.x}
                        y={mesa.y}
                        radius={50}
                        fill={mesaOcupada[mesa.id] ? "#FF5733" : "#8B4513"} // Rojo si está ocupada, marrón si está libre
                        shadowBlur={5}
                        draggable={editable}
                        onDragEnd={(e) => handleDragEnd(e, mesa.id)}
                        onClick={() => handleMesaSeleccionada(mesa.id)} // Seleccionar mesa
                    />

                    <Text
                        x={mesa.x - 25}
                        y={mesa.y - 10}
                        text={mesa.label}
                        fontSize={16}
                        fontStyle="bold"
                        fill="#FFF"
                    />
                    </React.Fragment>
                ))}

                {/* Barra editable para comedor */}
                {selectedTab === 0 && (
                    <>
                    <Rect
                        x={barraPos.x} // Usar el estado para la posición
                        y={barraPos.y} // Usar el estado para la posición
                        width={70}
                        height={350}
                        fill="#D8B384" // Color de la barra
                        cornerRadius={10}
                        draggable={editable} // Permitir arrastrar si es editable
                        onDragEnd={handleBarraDragEnd} // Actualizar posición al soltar
                    />
                    <Text
                        text="Barra"
                        x={barraPos.x + 15}
                        y={barraPos.y + 150}
                        fontSize={20}
                        fontStyle="bold"
                        fill="#333"
                        rotation={90} // Rotar texto 90 grados
                    />

                    {/* Añadir sillas a la barra */}
                    <Circle
                        x={barraPos.x + 35} // Centro de la barra en el eje X
                        y={barraPos.y - 25} // Parte superior de la barra
                        radius={12}
                        fill="#D8B384" // Color de las sillas
                        shadowBlur={3}
                    />
                    <Circle
                        x={barraPos.x + 35} // Centro de la barra en el eje X
                        y={barraPos.y + 375} // Parte inferior de la barra
                        radius={12}
                        fill="#D8B384" // Color de las sillas
                        shadowBlur={3}
                    />
                    </>
                )}
                </Layer>
            </Stage>
            </Paper>



        {/* Pestañas para cambiar entre comedor y terraza */}
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Comedor" />
          <Tab label="Terraza" />
        </Tabs>

        {/* Sección de empleados */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Empleados:
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {empleados.map((empleado, index) => (
                  <TableRow key={index}>
                    <TableCell>{empleado.nombre}</TableCell>
                    <TableCell>{empleado.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button startIcon={<AddIcon />} onClick={handleAddEmpleado} sx={{ mt: 2 }}>
            Añadir Empleado
          </Button>
        </Box>
      </Box>

      {/* Columna lateral derecha */}
      <Box
        sx={{
          width: '300px',
          bgcolor: '#F8F9FA',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid #ddd',
        }}
      >
        {/* Logo del restaurante */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            sx={{ width: 100, height: 100, bgcolor: '#ccc', margin: 'auto' }}
            variant="square"
          >
            LOGO RESTAURANTE
          </Avatar>
        </Box>

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            fullWidth
            onClick={() => setEditable(!editable)} // Cambiar modo de edición
            sx={{
              bgcolor: '#1976D2',
              '&:hover': { bgcolor: '#115293' },
            }}
          >
            {editable ? "Guardar Diseño" : "Editar Diseño"}
          </Button>
          <Button
            variant="contained"
            startIcon={<RestaurantIcon />}
            fullWidth
            sx={{
              bgcolor: '#1976D2',
              '&:hover': { bgcolor: '#115293' },
            }}
          >
            Caja Registradora
          </Button>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            fullWidth
            sx={{
              bgcolor: '#1976D2',
              '&:hover': { bgcolor: '#115293' },
            }}
          >
            Impresoras
          </Button>
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            fullWidth
            sx={{
              bgcolor: '#1976D2',
              '&:hover': { bgcolor: '#115293' },
            }}
          >
            Ajustes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RestauracionTPV;
