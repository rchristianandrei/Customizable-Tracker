using System.ComponentModel.DataAnnotations;

namespace server.Dtos;

public class PaginatedQueryParameters
{
    private int? _page;
    [Range(1, int.MaxValue)]
    public int? Page
    {
        get => _page;
        set => _page = value <= 0 ? null : value;
    }

    private int? _pageSize;
    [Range(1, 10)]
    public int? PageSize
    {
        get => _pageSize;
        set => _pageSize = (value is null or <= 0) ? null : value;
    }

    public int PageOrDefault => Page ?? 1;
    public int PageSizeOrDefault => PageSize ?? 10;
}
