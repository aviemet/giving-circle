module PresentationValues
  class RefreshJob < ApplicationJob
    queue_as :default

    def perform(presentation_id)
      return Cache.schedule_refresh(presentation_id) unless Cache.acquire_lock(presentation_id)

      dirty_at_start = Cache.read_dirty_at(presentation_id)

      if Cache.within_debounce_window?(presentation_id, dirty_at_start)
        Cache.reschedule_if_too_soon(presentation_id, dirty_at_start)
        return
      end

      presentation = Presentation.find(presentation_id)
      values = Aggregator.call(presentation)
      PresentationValuesChannel.broadcast(presentation, values) if Cache.write_if_changed(presentation_id, values)

      Cache.release_lock(presentation_id)
      dirty_at_end = Cache.read_dirty_at(presentation_id)

      if dirty_at_end > dirty_at_start
        Cache.schedule_refresh(presentation_id)
      else
        Cache.clear_first_dirty_at(presentation_id)
      end
    end
  end
end
