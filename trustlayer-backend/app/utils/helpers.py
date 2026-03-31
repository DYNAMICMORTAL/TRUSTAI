def sanitize_input(content: str) -> str:
    """Removes excessive whitespace or problematic characters from input string."""
    if not isinstance(content, str):
        return ""
    # Remove excessive newlines or spaces to compress prompt size
    clean_str = ' '.join(content.split())
    # Quick limit string length to prevent payload abuse (max 10000 chars)
    return clean_str[:10000]
