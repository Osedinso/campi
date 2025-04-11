import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

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
    border-color: #ff6b35;
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
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
    border-color: #ff6b35;
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
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
    border-color: #ff6b35;
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
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
  background-color: #ff6b35;
  color: white;
  
  &:hover {
    background-color: #ff5719;
  }
  
  &:disabled {
    background-color: #ffab90;
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
    border-color: #ff6b35;
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
  'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Beverages',
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'International', 'Local Specialties'
];

const cuisines = [
  'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 
  'Thai', 'Mediterranean', 'Middle Eastern', 'French', 'Korean', 'Spanish', 'Other'
];

const dietaryOptions = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 
  'Low-Carb', 'Keto', 'Halal', 'Kosher'
];

const locations = [
  'North Campus', 'South Campus', 'East Dorms', 'West Campus', 
  'Downtown', 'Library', 'Student Center', 'Other'
];

const CreateFoodListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    cuisine: '',
    dietary: [],
    location: '',
    description: '',
    ingredients: '',
    preparationTime: '',
    availableTime: '',
    servingSize: ''
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleDietaryChange = (e) => {
    const option = e.target.value;
    
    if (e.target.checked) {
      setFormData({
        ...formData,
        dietary: [...formData.dietary, option]
      });
    } else {
      setFormData({
        ...formData,
        dietary: formData.dietary.filter(item => item !== option)
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Food name is required';
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.cuisine) {
      newErrors.cuisine = 'Cuisine type is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Pickup location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients list is required';
    }
    
    if (!formData.preparationTime) {
      newErrors.preparationTime = 'Preparation time is required';
    }
    
    if (!formData.availableTime) {
      newErrors.availableTime = 'Available time is required';
    }
    
    if (!formData.servingSize) {
      newErrors.servingSize = 'Serving size is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here to save the food listing
      console.log('Submitted food listing:', formData);
      
      // Redirect to the food marketplace page
      navigate('/food-marketplace');
    } catch (error) {
      console.error('Error creating food listing:', error);
      setErrors({ submit: 'Failed to create food listing. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Header>
        <Title>Post Your Food Item</Title>
        <Subtitle>Share your culinary creations with the campus community</Subtitle>
      </Header>
      
      <FormCard>
        <Form onSubmit={handleSubmit}>
          <ImageUploadSection>
            <UploadIcon>🍲</UploadIcon>
            <UploadText>Upload Food Images</UploadText>
            <UploadSubtext>Drag and drop, or click to select files</UploadSubtext>
            <UploadSubtext>PNG, JPG or JPEG, max 5MB each (up to 5 images)</UploadSubtext>
          </ImageUploadSection>
          
          <FormGroup>
            <Label htmlFor="title">Food Name *</Label>
            <Input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="What are you cooking?"
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
          
          <FormGroup>
            <Label htmlFor="cuisine">Cuisine Type *</Label>
            <Select 
              id="cuisine" 
              name="cuisine" 
              value={formData.cuisine} 
              onChange={handleChange}
            >
              <option value="">Select cuisine</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </Select>
            {errors.cuisine && <ErrorMessage>{errors.cuisine}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Dietary Options</Label>
            <CheckboxGroup>
              {dietaryOptions.map(option => (
                <CheckboxLabel key={option}>
                  <Checkbox 
                    type="checkbox" 
                    value={option}
                    checked={formData.dietary.includes(option)}
                    onChange={handleDietaryChange}
                  />
                  {option}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="ingredients">Ingredients *</Label>
            <TextArea 
              id="ingredients" 
              name="ingredients" 
              value={formData.ingredients} 
              onChange={handleChange} 
              placeholder="List all ingredients used in your dish"
            />
            {errors.ingredients && <ErrorMessage>{errors.ingredients}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <TextArea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe your food, preparation method, taste, and what makes it special"
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="preparationTime">Preparation Time *</Label>
            <Input 
              type="text" 
              id="preparationTime" 
              name="preparationTime" 
              value={formData.preparationTime} 
              onChange={handleChange} 
              placeholder="e.g., 30 minutes"
            />
            {errors.preparationTime && <ErrorMessage>{errors.preparationTime}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="availableTime">Available Time *</Label>
            <Input 
              type="text" 
              id="availableTime" 
              name="availableTime" 
              value={formData.availableTime} 
              onChange={handleChange} 
              placeholder="e.g., Weekdays 5-8 PM"
            />
            {errors.availableTime && <ErrorMessage>{errors.availableTime}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="servingSize">Serving Size *</Label>
            <Input 
              type="text" 
              id="servingSize" 
              name="servingSize" 
              value={formData.servingSize} 
              onChange={handleChange} 
              placeholder="e.g., Serves 2 people"
            />
            {errors.servingSize && <ErrorMessage>{errors.servingSize}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">Pickup Location *</Label>
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
          
          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
          
          <ButtonGroup>
            <CancelButton to="/">Cancel</CancelButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Food Item'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
};

export default CreateFoodListing;
