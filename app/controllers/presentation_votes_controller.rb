class PresentationVotesController < ApplicationController
  include Searchable

  expose :presentation_votes, -> { search(PresentationVote.includes_associated, sortable_fields) }
  expose :presentation_vote, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes (circle_theme_presentation_votes)
  def index
    authorize presentation_votes

    paginated_presentation_votes = paginate(presentation_votes, :presentation_votes)

    render inertia: "PresentationVotes/Index", props: {
      presentation_votes: -> { paginated_presentation_votes.render(:index) },
      pagination: -> { {
        count: presentation_votes.size,
        **pagination_data(paginated_presentation_votes)
      } },
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (circle_theme_presentation_vote)
  def show
    authorize presentation_vote
    render inertia: "PresentationVotes/Show", props: {
      presentation_vote: -> { presentation_vote.render(:show) }
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/new (new_circle_theme_presentation_vote)
  def new
    authorize PresentationVote.new
    render inertia: "PresentationVotes/New", props: {
      presentation_vote: PresentationVote.new.render(:form_data)
    }
  end

  # @route GET /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id/edit (edit_circle_theme_presentation_vote)
  def edit
    authorize presentation_vote
    render inertia: "PresentationVotes/Edit", props: {
      presentation_vote: presentation_vote.render(:edit)
    }
  end

  # @route POST /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes (circle_theme_presentation_votes)
  def create
    authorize PresentationVote.new
    if presentation_vote.save
      redirect_to presentation_vote, notice: "Presentation vote was successfully created."
    else
      redirect_to new_presentation_vote_path, inertia: { errors: presentation_vote.errors }
    end
  end

  # @route PATCH /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (circle_theme_presentation_vote)
  # @route PUT /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (circle_theme_presentation_vote)
  def update
    authorize presentation_vote
    if presentation_vote.update(presentation_vote_params)
      redirect_to presentation_vote, notice: "Presentation vote was successfully updated."
    else
      redirect_to edit_presentation_vote_path, inertia: { errors: presentation_vote.errors }
    end
  end

  # @route DELETE /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/presentation_votes/:id (circle_theme_presentation_vote)
  def destroy
    authorize presentation_vote
    presentation_vote.destroy!
    redirect_to presentation_votes_url, notice: "Presentation vote was successfully destroyed."
  end

  private

  def sortable_fields
    %w(name type).freeze
  end

  def presentation_vote_params
    params.require(:presentation_vote).permit(:name, :type)
  end
end
