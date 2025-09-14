"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  // Recipient Information
  recipient_name: z.string().min(1, { message: "Recipient name is required" }),
  recipient_phone: z.string().min(1, { message: "Recipient phone is required" }),
  recipient_address: z.string().min(1, { message: "Recipient address is required" }),
  additional_info: z.string().optional(),
  recipient_city: z.number().min(1, { message: "Recipient city is required" }),
  recipient_zone: z.number().min(1, { message: "Recipient zone is required" }),
  recipient_area: z.number().min(1, { message: "Recipient area is required" }),
  
  // Parcel Information
  parcel_type: z.number().min(1, { message: "Parcel type is required" }),
  parcel_weight: z.number().min(0.1, { message: "Parcel weight must be at least 0.1 kg" }),
  parcel_value: z.number().min(1, { message: "Parcel value is required" }),
  
  // Pickup Information
  pickup_type: z.number().min(1, { message: "Pickup type is required" }),
  pickup_lat: z.number().min(-90).max(90, { message: "Invalid latitude" }),
  pickup_lon: z.number().min(-180).max(180, { message: "Invalid longitude" }),
  pickup_address: z.string().min(1, { message: "Pickup address is required" }),
  pickup_direction: z.string().optional(),
});

export default function NewOrderForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recipient_name: "Omar Faruq Shams",
      recipient_phone: "01788889348",
      recipient_address: "Adabor 10, Dhanmandi",
      additional_info: "recipient_address related infos",
      recipient_city: 1,
      recipient_zone: 1,
      recipient_area: 1,
      parcel_type: 2,
      parcel_weight: 0.5,
      parcel_value: 930,
      pickup_type: 1,
      pickup_lat: 23.3939292,
      pickup_lon: 90.48393993,
      pickup_address: "banani, dhaka",
      pickup_direction: "road 10, block c, banani r/a",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Order Creation Payload:", JSON.stringify(data, null, 2));
    
    toast("Order Created Successfully!", {
      description: (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-2">
            Check console for complete payload
          </p>
          <div className="text-xs bg-muted p-2 rounded">
            <strong>Recipient:</strong> {data.recipient_name}<br/>
            <strong>Phone:</strong> {data.recipient_phone}<br/>
            <strong>Weight:</strong> {data.parcel_weight}kg<br/>
            <strong>Value:</strong> ৳{data.parcel_value}
          </div>
        </div>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
        {/* Recipient Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recipient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recipient_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipient name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipient_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Phone *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="recipient_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Address *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter complete delivery address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="additional_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any additional delivery instructions"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Provide any special instructions for delivery
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="recipient_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Dhaka</SelectItem>
                      <SelectItem value="2">Chittagong</SelectItem>
                      <SelectItem value="3">Sylhet</SelectItem>
                      <SelectItem value="4">Rajshahi</SelectItem>
                      <SelectItem value="5">Khulna</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="recipient_zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone *</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Zone 1</SelectItem>
                      <SelectItem value="2">Zone 2</SelectItem>
                      <SelectItem value="3">Zone 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="recipient_area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area *</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Dhanmondi</SelectItem>
                      <SelectItem value="2">Gulshan</SelectItem>
                      <SelectItem value="3">Banani</SelectItem>
                      <SelectItem value="4">Uttara</SelectItem>
                      <SelectItem value="5">Mirpur</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Parcel Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Parcel Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="parcel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcel Type *</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parcel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Document</SelectItem>
                      <SelectItem value="2">Package</SelectItem>
                      <SelectItem value="3">Electronics</SelectItem>
                      <SelectItem value="4">Fragile</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="parcel_weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="parcel_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value (৳) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Pickup Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Pickup Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pickup_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Type *</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Regular Pickup</SelectItem>
                      <SelectItem value="2">Express Pickup</SelectItem>
                      <SelectItem value="3">Scheduled Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickup_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pickup address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="pickup_direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Directions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide detailed directions to pickup location"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Help the courier find your pickup location easily
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pickup_lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Latitude *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="23.000000"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickup_lon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Longitude *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="90.000000"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
          <Button type="submit" size="lg" className="px-8">
            Create Order
          </Button>
        </div>
      </form>
    </Form>
  );
}
