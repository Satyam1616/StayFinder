import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialListRef = useRef(null);
  const autoSlideTimer = useRef(null);
  const isPaused = useRef(false);

  const testimonials = [{
    id: '1',
    quote: 'StayFinder helped me discover a hidden gem in Bali. The host verification gave me peace of mind as a solo traveler.',
    author: 'Sophia L.',
    role: 'Solo Traveler',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }, {
    id: '2',
    quote: 'As a host, I\'ve increased my bookings by 60% using StayFinder\'s smart pricing tools.',
    author: 'Miguel R.',
    role: 'Superhost',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  }, {
    id: '3',
    quote: 'Found the perfect pet-friendly cabin for our family getaway through StayFinder\'s advanced filters.',
    author: 'The Chen Family',
    role: 'Pet Owners',
    image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=200&q=80'
  }];

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused.current) {
      autoSlideTimer.current = setInterval(() => {
        setTestimonialIndex(prev => {
          const next = prev + 1 < testimonials.length ? prev + 1 : 0;
          testimonialListRef.current?.scrollToIndex({ index: next, animated: true });
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(autoSlideTimer.current);
  }, [testimonialIndex]);

  const handlePause = () => {
    isPaused.current = true;
    clearInterval(autoSlideTimer.current);
  };

  const handleResume = () => {
    isPaused.current = false;
    // Resume auto-slide immediately
    autoSlideTimer.current = setInterval(() => {
      setTestimonialIndex(prev => {
        const next = prev + 1 < testimonials.length ? prev + 1 : 0;
        testimonialListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Trusted by <Text style={{ color: '#f43f5e' }}>Travelers{`\n`}Worldwide</Text>
      </Text>
      <Text style={styles.subtitle}>
        Join our community of happy travelers and hosts
      </Text>
      {/* Testimonial Slider */}
      <FlatList
        ref={testimonialListRef}
        data={testimonials}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / 340);
          setTestimonialIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.testimonialCard}>
            <Image source={{ uri: item.image }} style={styles.testimonialImage} />
            <Text style={styles.testimonialAuthor}>{item.author}</Text>
            <Text style={styles.testimonialRole}>{item.role}</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={16} color={i < 4 ? '#f43f5e' : '#e0e0e0'} style={{ marginRight: 1 }} />
              ))}
              <View style={styles.instantBookingBadge}>
                <Text style={styles.instantBookingText}>Instant Booking</Text>
              </View>
            </View>
            <Text style={styles.testimonialQuote}>"{item.quote}"</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={15} color="#f43f5e" style={{ marginRight: 4 }} />
              <Text style={styles.locationText}>Santorini, Greece</Text>
            </View>
          </View>
        )}
        snapToInterval={356}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
        onScrollBeginDrag={handlePause}
        onScrollEndDrag={handleResume}
      />
      {/* Arrows and Pagination */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          disabled={testimonialIndex === 0}
          onPress={() => {
            if (testimonialIndex > 0) {
              testimonialListRef.current.scrollToIndex({ index: testimonialIndex - 1, animated: true });
              setTestimonialIndex(testimonialIndex - 1);
            }
          }}
        >
          <Ionicons name="chevron-back-circle" size={28} color={testimonialIndex === 0 ? '#e0e0e0' : '#f43f5e'} />
        </TouchableOpacity>
        <View style={{ width: 16 }} />
        <TouchableOpacity
          style={styles.navButton}
          disabled={testimonialIndex === testimonials.length - 1}
          onPress={() => {
            if (testimonialIndex < testimonials.length - 1) {
              testimonialListRef.current.scrollToIndex({ index: testimonialIndex + 1, animated: true });
              setTestimonialIndex(testimonialIndex + 1);
            }
          }}
        >
          <Ionicons name="chevron-forward-circle" size={28} color={testimonialIndex === testimonials.length - 1 ? '#e0e0e0' : '#f43f5e'} />
        </TouchableOpacity>
      </View>
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {testimonials.map((_, i) => (
          <View key={i} style={[styles.paginationDot, testimonialIndex === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = {
  container: {
    marginTop: 32,
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 2,
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 18,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    width: 340,
    marginHorizontal: 8,
  },
  testimonialImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#f43f5e',
  },
  testimonialAuthor: {
    fontWeight: '700',
    fontSize: 15,
    color: '#222',
    marginBottom: 1,
  },
  testimonialRole: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  instantBookingBadge: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: 8,
  },
  instantBookingText: {
    color: '#f43f5e',
    fontWeight: '600',
    fontSize: 11,
  },
  testimonialQuote: {
    color: '#444',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  locationText: {
    color: '#888',
    fontSize: 12,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  navButton: {
    padding: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#f43f5e',
  },
}; 