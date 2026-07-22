module PresentationValues
  class RedisStore
    class InMemoryClient
      def initialize
        @data = {}
        @expiry = {}
      end

      def get(key)
        expire_key(key)
        @data[key]
      end

      def set(key, value, nx: false, ex: nil)
        expire_key(key)

        if nx && @data.key?(key)
          return nil
        end

        @data[key] = value
        @expiry[key] = Time.current.to_f + ex if ex

        "OK"
      end

      def setnx(key, value)
        set(key, value, nx: true).present?
      end

      def del(*keys)
        keys.flatten.each do |key|
          @data.delete(key)
          @expiry.delete(key)
        end
      end

      private

      def expire_key(key)
        expires_at = @expiry[key]
        return unless expires_at

        if Time.current.to_f >= expires_at
          @data.delete(key)
          @expiry.delete(key)
        end
      end
    end

    def self.current
      @current ||= build
    end

    def self.reset!
      @current = nil
    end

    def self.build
      if Rails.env.test?
        InMemoryClient.new
      else
        Redis.new(url: REDIS_URL)
      end
    end
  end
end
