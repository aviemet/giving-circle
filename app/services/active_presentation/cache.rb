module ActivePresentation
  class Cache
    DEBOUNCE_DELAY = 1.second
    MAX_WAIT = 5.seconds
    LOCK_TTL = 30.seconds

    class << self
      def fetch(presentation_id)
        raw = redis.get(snapshot_key(presentation_id))
        if raw.present?
          return JSON.parse(raw, symbolize_names: true)
        end

        presentation = Presentation.find(presentation_id)
        values = Snapshot.call(presentation)
        redis.set(snapshot_key(presentation_id), values.to_json)
        values
      end

      def write_if_changed(presentation_id, payload)
        serialized = payload.to_json
        current = redis.get(snapshot_key(presentation_id))
        return if current == serialized

        redis.set(snapshot_key(presentation_id), serialized)
        payload
      end

      def schedule_refresh(presentation_id)
        presentation = Presentation.find_by(id: presentation_id)
        return unless presentation&.active?

        now = Time.current.to_f
        redis.set(dirty_at_key(presentation_id), now)
        redis.setnx(first_dirty_at_key(presentation_id), now)

        first_dirty = redis.get(first_dirty_at_key(presentation_id)).to_f
        elapsed = now - first_dirty
        delay = elapsed >= MAX_WAIT ? 0 : [DEBOUNCE_DELAY, MAX_WAIT - elapsed].min

        ActivePresentation::RefreshJob.set(wait: delay).perform_later(presentation_id)
      end

      def read_dirty_at(presentation_id)
        redis.get(dirty_at_key(presentation_id)).to_f
      end

      def clear_first_dirty_at(presentation_id)
        redis.del(first_dirty_at_key(presentation_id))
      end

      def acquire_lock(presentation_id)
        redis.set(lock_key(presentation_id), "1", nx: true, ex: LOCK_TTL.to_i)
      end

      def release_lock(presentation_id)
        redis.del(lock_key(presentation_id))
      end

      def within_debounce_window?(presentation_id, dirty_at_start)
        now = Time.current.to_f
        first_dirty = redis.get(first_dirty_at_key(presentation_id)).to_f
        quiet_for = now - dirty_at_start
        age = now - first_dirty
        quiet_for < DEBOUNCE_DELAY && age < MAX_WAIT
      end

      def reschedule_if_too_soon(presentation_id, dirty_at_start)
        release_lock(presentation_id)
        delay = DEBOUNCE_DELAY - (Time.current.to_f - dirty_at_start)
        delay = [delay, 0].max
        ActivePresentation::RefreshJob.set(wait: delay.seconds).perform_later(presentation_id)
      end

      def snapshot_key(presentation_id)
        "active_presentation:#{presentation_id}"
      end

      def dirty_at_key(presentation_id)
        "active_presentation:#{presentation_id}:meta:dirty_at"
      end

      def first_dirty_at_key(presentation_id)
        "active_presentation:#{presentation_id}:meta:first_dirty_at"
      end

      def lock_key(presentation_id)
        "active_presentation:#{presentation_id}:meta:lock"
      end

      def redis
        PresentationValues::RedisStore.current
      end
    end
  end
end
