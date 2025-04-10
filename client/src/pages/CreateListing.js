import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { createListing } from '../redux/slices/listingsSlice';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1e88e5;
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const SubmitButton = styled(Button)`
  background-color: #1e88e5;
  color: white;
  
  &:hover {
    background-color: #1976d2;
  }
  
  &:disabled {
    background-color: #90caf9;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Link)`
  flex: 1;
  padding: 0.75rem;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ImageUploadSection = styled.div`
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:hover {
    border-color: #1e88e5;
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #999;
`;

const UploadText = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  color: #999;
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  color: #e53935;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const categories = [
  'Books', 'Electronics', 'Furniture', 'Clothing', 
  'Appliances', 'Food', 'Services', 'Housing', 'Other'
];

const conditions = [
  'New', 'Like New', 'Good', 'Fair', 'Poor'
];

const locations = [
  'North Campus', 'South Campus', 'East Dorms', 'West Campus', 
  'Downtown', 'Library', 'Student Center', 'Other'
];

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.listings);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when field is edited
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.condition && formData.category !== 'Services') {
      newErrors.condition = 'Condition is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Mock successful submission
      setTimeout(() => {
        alert('Listing created successfully!');
        navigate('/marketplace');
      }, 1000);
      
      // When Redux is ready:
      // dispatch(createListing(formData)).then(() => {
      //   navigate('/marketplace');
      // });
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Create a Listing</Title>
        <Subtitle>Share what you want to sell or offer to the campus community</Subtitle>
      </Header>
      
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <ImageUploadSection>
            <UploadIcon>📸</UploadIcon>
            <UploadText>Upload Images</UploadText>
            <UploadSubtext>Drag and drop, or click to select files</UploadSubtext>
            <UploadSubtext>PNG, JPG or JPEG, max 5MB each (up to 5 images)</UploadSubtext>
          </ImageUploadSection>
          
          <FormGroup>
            <Label htmlFor="title">Title *</Label>
            <Input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="What are you selling?"
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="price">Price ($) *</Label>
            <Input 
              type="number" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category *</Label>
            <Select 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
          </FormGroup>
          
          {formData.category !== 'Services' && (
            <FormGroup>
              <Label htmlFor="condition">Condition *</Label>
              <Select 
                id="condition" 
                name="condition" 
                value={formData.condition} 
                onChange={handleChange}
              >
                <option value="">Select condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </Select>
              {errors.condition && <ErrorMessage>{errors.condition}</ErrorMessage>}
            </FormGroup>
          )}
          
          <FormGroup>
            <Label htmlFor="location">Location *</Label>
            <Select 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>
            {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <TextArea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Provide details about your item, such as features, condition, why you're selling, etc."
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>
          
          <ButtonGroup>
            <CancelButton to="/marketplace">Cancel</CancelButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Listing'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
};

export default CreateListing;
