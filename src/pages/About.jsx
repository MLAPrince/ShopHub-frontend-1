import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-gradient-primary">About ShopHub</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Your trusted destination for quality products, great prices, and exceptional service. 
            We're passionate about connecting you with the things you love.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, title: '10M+ Customers', desc: 'Trust us worldwide' },
              { icon: Award, title: '99% Satisfaction', desc: 'Customer rating' },
              { icon: Globe, title: '50+ Countries', desc: 'Global shipping' },
              { icon: Heart, title: '24/7 Support', desc: 'Always here for you' }
            ].map((stat, index) => (
              <Card key={index} className="card-gradient text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                  <p className="text-muted-foreground">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To make online shopping simple, secure, and enjoyable for everyone. 
              We believe great products should be accessible to all, backed by 
              outstanding customer service and fast, reliable delivery.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;