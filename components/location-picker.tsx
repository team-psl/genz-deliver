"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocationSuggestion {
  id: string
  name: string
  address: string
  type: "area" | "landmark" | "address"
  coordinates?: { lat: number; lng: number }
}

interface LocationPickerProps {
  value: string
  onChange: (value: string, coordinates?: { lat: number; lng: number }) => void
  placeholder?: string
  className?: string
  showMap?: boolean
}

// Mock location data for Dhaka
const mockLocations: LocationSuggestion[] = [
  {
    id: "1",
    name: "Gulshan 1",
    address: "Gulshan 1, Dhaka",
    type: "area",
    coordinates: { lat: 23.7808, lng: 90.4176 },
  },
  {
    id: "2",
    name: "Dhanmondi 27",
    address: "Dhanmondi 27, Dhaka",
    type: "area",
    coordinates: { lat: 23.7461, lng: 90.3742 },
  },
  {
    id: "3",
    name: "Uttara Sector 3",
    address: "Uttara Sector 3, Dhaka",
    type: "area",
    coordinates: { lat: 23.8759, lng: 90.3795 },
  },
  { id: "4", name: "Banani", address: "Banani, Dhaka", type: "area", coordinates: { lat: 23.7936, lng: 90.4066 } },
  { id: "5", name: "Mirpur 1", address: "Mirpur 1, Dhaka", type: "area", coordinates: { lat: 23.8103, lng: 90.3654 } },
  { id: "6", name: "Wari", address: "Wari, Dhaka", type: "area", coordinates: { lat: 23.7104, lng: 90.4074 } },
  {
    id: "7",
    name: "Motijheel",
    address: "Motijheel, Dhaka",
    type: "area",
    coordinates: { lat: 23.7337, lng: 90.4173 },
  },
  {
    id: "8",
    name: "New Market",
    address: "New Market, Dhaka",
    type: "landmark",
    coordinates: { lat: 23.7279, lng: 90.3854 },
  },
  {
    id: "9",
    name: "Bashundhara City",
    address: "Bashundhara City Shopping Mall, Dhaka",
    type: "landmark",
    coordinates: { lat: 23.7501, lng: 90.3872 },
  },
  {
    id: "10",
    name: "Hazrat Shahjalal International Airport",
    address: "Airport, Dhaka",
    type: "landmark",
    coordinates: { lat: 23.8433, lng: 90.3978 },
  },
]

export function LocationPicker({
  value,
  onChange,
  placeholder = "Enter location",
  className,
  showMap = false,
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter suggestions based on input
  useEffect(() => {
    if (value.length > 2) {
      const filtered = mockLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(value.toLowerCase()) ||
          location.address.toLowerCase().includes(value.toLowerCase()),
      )
      setSuggestions(filtered.slice(0, 6))
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [value])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    onChange(suggestion.address, suggestion.coordinates)
    setSelectedCoordinates(suggestion.coordinates || null)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleCurrentLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setSelectedCoordinates({ lat: latitude, lng: longitude })

          // Mock reverse geocoding - in real app, you'd use a geocoding service
          const nearestLocation = mockLocations.reduce((prev, curr) => {
            const prevDistance = Math.sqrt(
              Math.pow(prev.coordinates!.lat - latitude, 2) + Math.pow(prev.coordinates!.lng - longitude, 2),
            )
            const currDistance = Math.sqrt(
              Math.pow(curr.coordinates!.lat - latitude, 2) + Math.pow(curr.coordinates!.lng - longitude, 2),
            )
            return prevDistance < currDistance ? prev : curr
          })

          onChange(`Near ${nearestLocation.name}`, { lat: latitude, lng: longitude })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        },
      )
    } else {
      setIsLoading(false)
    }
  }

  const clearLocation = () => {
    onChange("")
    setSelectedCoordinates(null)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-20"
          onFocus={() => value.length > 2 && setIsOpen(true)}
        />
        <div className="absolute right-2 top-2 flex items-center space-x-1">
          {value && (
            <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={clearLocation}>
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleCurrentLocation}
            disabled={isLoading}
          >
            <Navigation className={cn("h-3 w-3", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto">
          <CardContent className="p-0">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm">{suggestion.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">{suggestion.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Mini Map Preview */}
      {showMap && selectedCoordinates && (
        <div className="mt-3">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Selected Location</span>
                <Badge variant="outline" className="text-xs">
                  {selectedCoordinates.lat.toFixed(4)}, {selectedCoordinates.lng.toFixed(4)}
                </Badge>
              </div>
              <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Map preview would appear here</p>
                  <p className="text-xs text-muted-foreground">In production, integrate with Google Maps or similar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Popular Locations */}
      {!value && !isOpen && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Popular locations:</p>
          <div className="flex flex-wrap gap-1">
            {mockLocations.slice(0, 4).map((location) => (
              <Button
                key={location.id}
                type="button"
                variant="outline"
                size="sm"
                className="h-6 text-xs bg-transparent"
                onClick={() => handleSuggestionClick(location)}
              >
                {location.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
